using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MomgoSample.Data
{    
    public class MongoAccess
    {
        private IMongoClient client;
        private IMongoDatabase db;
        #region Custom
        public MongoAccess(string connectionString, string dateBaseName = "")
        {             
            client = new MongoClient(connectionString);           
            this.DataBaseName = dateBaseName;
        }
        public string DataBaseName
        {
            get
            {
                return db.DatabaseNamespace.DatabaseName;
            }
            set
            {
                db = client.GetDatabase(value);                 
            }
        }        
        public async Task<TResult> RunProcedureAsync<TResult>(string procedureName, params string[] args)
        {            
            return await db.RunCommandAsync<TResult>(new BsonDocument(new BsonElement("eval", createCommand(procedureName, args))));                         
        }
        public async Task<BsonDocument> RunProcedureAsync(string procedureName, params string[] args)
        {
            return await db.RunCommandAsync<BsonDocument>(new BsonDocument(new BsonElement("eval", createCommand(procedureName, args))));
        }
        public TResult RunProcedure<TResult>(string procedureName, params string[] args)
        {
            return db.RunCommandAsync<TResult>(new BsonDocument(new BsonElement("eval", createCommand(procedureName, args)))).Result;
        }
        public BsonDocument RunProcedure(string procedureName, params string[] args)
        {             
            return db.RunCommandAsync<BsonDocument>(new BsonDocument(new BsonElement("eval", createCommand(procedureName, args)))).Result;
            
        }
        public BsonDocument RunProcedure(string procedureName, params object[] args)
        {
            return db.RunCommandAsync<BsonDocument>(new BsonDocument(new BsonElement("eval", createCommand(procedureName, GetBsonType(args))))).Result;
            
        }
        public async Task<BsonDocument> GetLastErrowAsync(int w = 1, int wtimeout = 5000)
        {
            return await db.RunCommandAsync<BsonDocument>(new BsonDocument { { "getLastError", 1 }, { "w", w }, { "wtimeout", wtimeout } });

        }
        public BsonDocument GetLastErrow(int w = 1,int wtimeout = 5000)
        {
            return db.RunCommandAsync<BsonDocument>(new BsonDocument { { "getLastError", 1 }, { "w", w }, { "wtimeout", wtimeout } }).Result;

        }
        public static int GetTimestamp()
        {
            return Convert.ToInt32((DateTime.Now.AddHours(-8) - new DateTime(1970, 1, 1, 0, 0, 0)).TotalSeconds);
        }
        public static DateTime GetDateTime(double timestamp)
        {
            return (new DateTime(1970, 1, 1, 0, 0, 0)).AddHours(8).AddSeconds(timestamp);
        }
        public static string[] GetBsonType(params object[] args)
        {
            List<string> strings = new List<string>();
            for (int i = 0; i < args.Length; i++)
            {
                if (args[i] == null)
                {
                    strings.Add("null");
                }
                else 
                { 
                    switch (args[i].GetType().Name.ToUpper())
                    {
                        case "CHAR":
                        case "STRING":
                            strings.Add("'" + args[i].ToString() + "'");
                            break;                        
                        case "DECIMAL":
                        case "INT32":                            
                        case "INT64":
                            strings.Add("NumberLong(" + args[i].ToString() + ")");
                            break;
                        case "DOUBLE":
                            strings.Add(args[i].ToString());
                            break;
                        case "OBJECTID":
                            strings.Add("new ObjectId(" + args[i].ToString() + ")");                        
                            break;                        
                        case "DATETIME":
                            DateTime dt = Convert.ToDateTime(args[i]);
                            strings.Add(string.Format("new Date({0},{1},{2},{3},{4},{5},{6})",dt.Year,dt.Month,dt.Day,dt.Hour,dt.Minute,dt.Second,dt.Millisecond));  
                            break;
                        case "BOOLEAN":
                            strings.Add(args[i].ToString().ToLower());
                            break;
                    }
                }
            }
            return strings.ToArray();
        }
        private string createCommand(string procedureName, params string[] args)
        {           
            return procedureName + "(" + string.Join(",", args) + ")";            
        }
        #endregion
       
        #region IMongoDatabase
        public IMongoCollection<TDocument> GetCollection<TDocument>(string tableName = "") where TDocument : class
        {
            if (tableName == "")
            {
                return db.GetCollection<TDocument>(typeof(TDocument).Name.ToLower());
            }
            return db.GetCollection<TDocument>(tableName);
        }
        public async Task<bool> CreateCollectionAsync(string tableName)
        {
            await db.CreateCollectionAsync(tableName);
            return true;
        }
        public bool CreateCollection(string tableName)
        {
            return CreateCollectionAsync(tableName).Result;
        } 

        public async Task<bool> DropCollectionAsync(string tableName)
        {
            await db.DropCollectionAsync(tableName);
            return true;
        }
        public bool DropCollection(string tableName)
        {
           return DropCollectionAsync(tableName).Result;
        }

        public async Task<IAsyncCursor<BsonDocument>> ListCollectionsAsync()
        {
            return await db.ListCollectionsAsync();
        }
        public List<BsonDocument> ListCollections()
        {
            using (IAsyncCursor<BsonDocument> cursor = ListCollectionsAsync().Result)
            {
                return cursor.ToListAsync().Result;
            }
        }  

        public async Task<TResult> RunCommandAsync<TResult>(Command<TResult> command, ReadPreference readPreference = null)
        {
            return await db.RunCommandAsync<TResult>(command, readPreference);
        }
        public TResult RunCommand<TResult>(Command<TResult> command, ReadPreference readPreference = null)
        {
            return RunCommandAsync<TResult>(command, readPreference).Result;
        }
        #endregion
        #region IMongoClient
        public async Task<bool> InsertOneAsync<TDocument>(string tableName, TDocument document) where TDocument : class
        {
            IMongoCollection<TDocument> collection = db.GetCollection<TDocument>(tableName);
            await collection.InsertOneAsync(document);
            return true;
        }
        public bool InsertOne<TDocument>(string tableName, TDocument document) where TDocument : class
        {
            return InsertOneAsync<TDocument>(tableName, document).Result;
        }

        public async Task<bool> InsertManyAsync<TDocument>(string tableName, IEnumerable<TDocument> documents, InsertManyOptions options = null) where TDocument : class
        {
            IMongoCollection<TDocument> collection = db.GetCollection<TDocument>(tableName);
            await collection.InsertManyAsync(documents, options);
            return true;
        }
        public bool InsertMany<TDocument>(string tableName, IEnumerable<TDocument> documents, InsertManyOptions options = null) where TDocument : class
        {
            return InsertManyAsync<TDocument>(tableName, documents, options).Result;
        }

        public async Task<UpdateResult> UpdateOneAsync<TDocument>(string tableName, FilterDefinition<TDocument> filter, UpdateDefinition<TDocument> update, UpdateOptions options = null) where TDocument : class
        {
            IMongoCollection<TDocument> collection = db.GetCollection<TDocument>(tableName);
            return await collection.UpdateOneAsync(filter, update, options);
        }
        public UpdateResult UpdateOne<TDocument>(string tableName, FilterDefinition<TDocument> filter, UpdateDefinition<TDocument> update, UpdateOptions options = null) where TDocument : class
        {
            return UpdateOneAsync<TDocument>(tableName,filter, update, options).Result;
        }

        public async Task<UpdateResult> UpdateManyAsync<TDocument>(string tableName, FilterDefinition<TDocument> filter, UpdateDefinition<TDocument> update, UpdateOptions options = null) where TDocument : class
        {
            IMongoCollection<TDocument> collection = db.GetCollection<TDocument>(tableName);
            return await collection.UpdateManyAsync(filter, update);
        }
        public UpdateResult UpdateMany<TDocument>(string tableName, FilterDefinition<TDocument> filter, UpdateDefinition<TDocument> update, UpdateOptions options = null) where TDocument : class
        {
            return UpdateManyAsync(tableName, filter, update).Result;
        }

        public async Task<ReplaceOneResult> ReplaceOneAsync<TDocument>(string tableName, FilterDefinition<TDocument> filter, TDocument document) where TDocument : class
        {
            IMongoCollection<TDocument> collection = db.GetCollection<TDocument>(tableName);
            return await collection.ReplaceOneAsync(filter, document);
        }
        public ReplaceOneResult ReplaceOne<TDocument>(string tableName, FilterDefinition<TDocument> filter, TDocument document) where TDocument : class
        {
            return ReplaceOneAsync<TDocument>(tableName,filter, document).Result;
        }

        public async Task<DeleteResult> DeleteOneAsync<TDocument>(string tableName, FilterDefinition<TDocument> filter) where TDocument : class
        {
            IMongoCollection<TDocument> collection = db.GetCollection<TDocument>(tableName);
            return await collection.DeleteOneAsync(filter);
        }
        public DeleteResult DeleteOne<TDocument>(string tableName, FilterDefinition<TDocument> filter) where TDocument : class
        {
            return DeleteOneAsync<TDocument>(tableName,filter).Result;
        }

        public async Task<DeleteResult> DeleteManyAsync<TDocument>(string tableName, FilterDefinition<TDocument> filter) where TDocument : class
        {
            IMongoCollection<TDocument> collection = db.GetCollection<TDocument>(tableName);
            return await collection.DeleteManyAsync(filter);
        }
        public DeleteResult DeleteMany<TDocument>(string tableName, FilterDefinition<TDocument> filter) where TDocument : class
        {
            return DeleteManyAsync<TDocument>(tableName,filter).Result;
        }
        public async Task<long> CountAsync<TDocument>(string tableName, FilterDefinition<TDocument> filter = null, CountOptions options = null) where TDocument : class  
        {
            IMongoCollection<TDocument> collection = db.GetCollection<TDocument>(tableName);
            if (filter == null)
            {
                return await collection.CountAsync(new BsonDocument(), options);
            }
            return await collection.CountAsync(filter, options);
        }
        public long Count<TDocument>(string tableName, FilterDefinition<TDocument> filter = null, CountOptions options = null) where TDocument : class  
        {             
            return CountAsync<TDocument>(tableName,filter, options).Result;
        }
        public async Task<IAsyncCursor<TField>> DistinctAsync<TDocument,TField>(string tableName, FieldDefinition<TDocument, TField> field, FilterDefinition<TDocument> filter = null, DistinctOptions options = null) where TDocument : class
        {
            IMongoCollection<TDocument> collection = db.GetCollection<TDocument>(tableName);
            if (filter == null)
            {
                return await collection.DistinctAsync<TField>(field, new BsonDocument(), options);
            }
            return await collection.DistinctAsync<TField>(field, filter, options);
        }
        public IAsyncCursor<TField> Distinct<TDocument, TField>(string tableName, FieldDefinition<TDocument, TField> field, FilterDefinition<TDocument> filter = null, DistinctOptions options = null) where TDocument : class
        {
            IMongoCollection<TDocument> collection = db.GetCollection<TDocument>(tableName);
            if (filter == null)
            {
                return collection.DistinctAsync<TField>(field, new BsonDocument(), options).Result;
            }
            return collection.DistinctAsync<TField>(field, filter, options).Result;
        }
        public async Task<IAsyncCursor<TProjection>> FindAsync<TDocument, TProjection>(string tableName, FilterDefinition<TDocument> filter = null, FindOptions<TDocument, TProjection> options = null) where TDocument : class
        {
            IMongoCollection<TDocument> collection = db.GetCollection<TDocument>(tableName);
            if (filter == null)
            {
                return await collection.FindAsync(new BsonDocument(), options);
            }
            return await collection.FindAsync(filter, options);
        }
        public List<TProjection> Find<TDocument, TProjection>(string tableName, FilterDefinition<TDocument> filter = null, FindOptions<TDocument, TProjection> options = null) where TDocument : class
        {
            using (IAsyncCursor<TProjection> cursor = FindAsync<TDocument, TProjection>(tableName, filter, options).Result)
            {
                return cursor.ToListAsync().Result;
            }
        }
        public List<TProjection> Find<TDocument, TProjection>(string tableName, FindOptions<TDocument, TProjection> options) where TDocument : class
        {
            using (IAsyncCursor<TProjection> cursor = FindAsync<TDocument, TProjection>(tableName, null, options).Result)
            {
                return cursor.ToListAsync().Result;
            }
        }
        public List<TDocument> Find<TDocument>(string tableName, FilterDefinition<TDocument> filter = null, FindOptions<TDocument, TDocument> options = null) where TDocument : class
        {
            using (IAsyncCursor<TDocument> cursor = FindAsync<TDocument, TDocument>(tableName, filter, options).Result)
            {
                return cursor.ToListAsync().Result;
            }
        }
        public List<TDocument> Find<TDocument>(string tableName, FindOptions<TDocument, TDocument> options) where TDocument : class
        {
            using (IAsyncCursor<TDocument> cursor = FindAsync<TDocument, TDocument>(tableName, null, options).Result)
            {
                return cursor.ToListAsync().Result;
            }
        }
        //public async Task<List<TDocument>> FindAsync<TDocument>(string tableName, FilterDefinition<TDocument> filter = null, FindOptions options = null) where TDocument : class
        //{
        //    IMongoCollection<TDocument> collection = db.GetCollection<TDocument>(tableName);
        //    if (filter == null)
        //    {
        //        return await collection.Find(new BsonDocument(), options).ToListAsync();
        //    }
        //    return await collection.Find(filter, options).ToListAsync();
        //}
        //public List<TDocument> Find<TDocument>(string tableName, FilterDefinition<TDocument> filter = null, FindOptions options = null) where TDocument : class
        //{
        //    return FindAsync<TDocument>(tableName, filter, options).Result;            
        //}

        public async Task<TProjection> FindOneAndDeleteAsync< TDocument,TProjection>(string tableName, FilterDefinition<TDocument> filter, FindOneAndDeleteOptions<TDocument, TProjection> options = null) where TDocument : class
        {
            IMongoCollection<TDocument> collection = db.GetCollection<TDocument>(tableName);
            return await collection.FindOneAndDeleteAsync<TProjection>(filter, options);
        }
        public TProjection FindOneAndDelete<TProjection, TDocument>(string tableName, FilterDefinition<TDocument> filter, FindOneAndDeleteOptions<TDocument, TProjection> options = null) where TDocument : class
        {
            return FindOneAndDeleteAsync<TDocument, TProjection>(tableName, filter, options).Result;
        }
        public TDocument FindOneAndDelete<TDocument>(string tableName, FilterDefinition<TDocument> filter, FindOneAndDeleteOptions<TDocument, TDocument> options = null) where TDocument : class
        {
            return FindOneAndDeleteAsync<TDocument, TDocument>(tableName, filter, options).Result;
        }

        public async Task<TProjection> FindOneAndReplaceAsync<TDocument, TProjection>(string tableName, FilterDefinition<TDocument> filter, TDocument replacement, FindOneAndReplaceOptions<TDocument, TProjection> options = null) where TDocument : class
        {
            IMongoCollection<TDocument> collection = db.GetCollection<TDocument>(tableName);
            return await collection.FindOneAndReplaceAsync<TProjection>(filter, replacement, options);
        }
        public TProjection FindOneAndReplace<TDocument, TProjection>(string tableName, FilterDefinition<TDocument> filter, TDocument replacement, FindOneAndReplaceOptions<TDocument, TProjection> options = null) where TDocument : class
        {
            return FindOneAndReplaceAsync<TDocument, TProjection>(tableName, filter, replacement, options).Result;
        }
        public TDocument FindOneAndReplace<TDocument>(string tableName, FilterDefinition<TDocument> filter, TDocument replacement, FindOneAndReplaceOptions<TDocument, TDocument> options = null) where TDocument : class
        {
            return FindOneAndReplaceAsync<TDocument, TDocument>(tableName, filter, replacement, options).Result;
        }

        public async Task<TProjection> FindOneAndUpdateAsync<TDocument, TProjection>(string tableName, FilterDefinition<TDocument> filter, UpdateDefinition<TDocument> update, FindOneAndUpdateOptions<TDocument, TProjection> options = null) where TDocument : class
        {
            IMongoCollection<TDocument> collection = db.GetCollection<TDocument>(tableName);
            return await collection.FindOneAndUpdateAsync<TProjection>(filter, update, options);
        }
        public TProjection FindOneAndUpdate<TDocument, TProjection>(string tableName, FilterDefinition<TDocument> filter, UpdateDefinition<TDocument> update, FindOneAndUpdateOptions<TDocument, TProjection> options = null) where TDocument : class
        {
            return FindOneAndUpdateAsync<TDocument, TProjection>(tableName, filter, update, options).Result;
        }
        public TDocument FindOneAndUpdate<TDocument>(string tableName, FilterDefinition<TDocument> filter, UpdateDefinition<TDocument> update, FindOneAndUpdateOptions<TDocument, TDocument> options = null) where TDocument : class
        {
            return FindOneAndUpdateAsync<TDocument, TDocument>(tableName, filter, update, options).Result;
        }

        public async Task<IAsyncCursor<TDocument>> AggregateAsync<TDocument>(string tableName, PipelineDefinition<TDocument, TDocument> pipeline, AggregateOptions options = null) where TDocument : class
        {
            IMongoCollection<TDocument> collection = db.GetCollection<TDocument>(tableName);
            return await collection.AggregateAsync(pipeline, options);
        }
        public IAsyncCursor<TDocument> Aggregate<TDocument>(string tableName, PipelineDefinition<TDocument, TDocument> pipeline, AggregateOptions options = null) where TDocument : class
        {
            return AggregateAsync<TDocument>(tableName,pipeline, options).Result;
        }

        public async Task<IAsyncCursor<TResult>> MapReduceAsync<TDocument, TResult>(string tableName, BsonJavaScript map, BsonJavaScript reduce, MapReduceOptions<TDocument, TResult> options = null) where TDocument : class
        {
            IMongoCollection<TDocument> collection = db.GetCollection<TDocument>(tableName);
            return await collection.MapReduceAsync<TResult>(map, reduce, options);
        }
        public IAsyncCursor<TResult> MapReduce<TDocument, TResult>(string tableName, BsonJavaScript map, BsonJavaScript reduce, MapReduceOptions<TDocument, TResult> options = null) where TDocument : class
        {
            return MapReduceAsync<TDocument, TResult>(tableName, map, reduce, options).Result;
        }
        #endregion
    }
}
