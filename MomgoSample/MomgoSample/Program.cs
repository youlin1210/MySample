
using Jepun.Core.Data.Common;
using MomgoSample.Data;
using MomgoSample.Model;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MomgoSample
{
    class Program
    {
        static MongoAccess db;
        static void Main(string[] args)
        {

            //var collection = db.GetCollection<Restaurant>("restaurant");
            

            Tuple<string, string> connSet = ManagementConnectionSetting.GetConnectionString("MongoDB");
            db = new MongoAccess(connSet.Item1, connSet.Item2);
            //FindOneAndDelete();
            //FindOneAndUpdate();
            //ListCollections();
            //InsertOneByORM();
            InsertOne();
            //RunCommand();
            Console.ReadLine();
        }
        static void ListCollections()
        {
            foreach (var doc in db.ListCollections())
            {
                  
                //Console.WriteLine(doc.address.street);
                //Console.WriteLine(doc.grades[0].date);
            }
        }
        static void FindOneAndDelete()
        {
            FilterDefinitionBuilder<Restaurant> builder = Builders<Restaurant>.Filter;
            
            //FilterDefinition<Restaurant> filter = builder.Eq("_id", new ObjectId("5555b1d97eb2e22c90c199ed")) & builder.Eq("ts", 1431679450);
            FilterDefinition<Restaurant> filter = builder.Where(r => r.Id == new ObjectId("5555b1d97eb2e22c90c199ed") && r.ts == 1431679450);
            foreach (var doc in db.Find<Restaurant>("restaurants", filter))
            {
                Console.WriteLine(doc.address.street);
                Console.WriteLine(doc.grades[0].date);
                Console.WriteLine(doc.ts);
            }
            Restaurant tt = db.FindOneAndDelete<Restaurant>("restaurants", filter);
            BsonDocument ff = db.GetLastErrow();
            foreach (var doc in db.Find<Restaurant>("restaurants"))
            {
                Console.WriteLine(doc.address.street);
                Console.WriteLine(doc.grades[0].date);
                Console.WriteLine(doc.ts);
            }
        }
        static void FindOneAndUpdate()
        {
            Restaurant restaurant = new Restaurant();
            restaurant.address = new Address { street = "rrrrrrrrrrrr", zipcode = "888888", building = "50", coord = new List<double>() { 73.9557413, 40.7720266 } };
            restaurant.borough = "Manhattan Manhattan";
            restaurant.cuisine = "Italian Italian";
            restaurant.grades = new List<Grade>() { 
                new Grade { date = new DateTime(2014, 10, 1, 0, 0, 0, DateTimeKind.Utc), grade ="A",score=22} ,
                new Grade { date = new DateTime(2014, 1, 6, 0, 0, 0, DateTimeKind.Utc), grade ="B",score=11}
            };
            restaurant.name = "GOOOOOOO";
            restaurant.restaurant_id = "33333333333";
            restaurant.ts = MongoAccess.GetTimestamp();

            FilterDefinitionBuilder<Restaurant> builder = Builders<Restaurant>.Filter;
            //FilterDefinition<Restaurant> filter = builder.Eq("_id", new ObjectId("5555b1d97eb2e22c90c199ed")) & builder.Eq("ts", 1431679450);
            FilterDefinition<Restaurant> filter = builder.Where(r => r.Id == new ObjectId("5555b1d97eb2e22c90c199ed") && r.ts == 1431679450);
            
            foreach (var doc in db.Find<Restaurant>("restaurants", filter))
            {
                Console.WriteLine(doc.address.street);
                Console.WriteLine(doc.grades[0].date);
                Console.WriteLine(doc.ts);
            }
            //UpdateDefinition<Restaurant> update = Builders<Restaurant>.Update.Set("address.street", "East 31st Street")
            //                                                          .Set("ts", MongoAccess.GetTimestamp());
            //UpdateDefinition<Restaurant> update = Builders<Restaurant>.Update.Set("address", restaurant.address)
            //                                                          .Set("ts", restaurant.ts);
            UpdateDefinition<Restaurant> update = Builders<Restaurant>.Update.Set(r=>r.address, restaurant.address)
                                                                      .Set(r=>r.ts, restaurant.ts);



            //Restaurant tt = db.FindOneAndUpdate<Restaurant, Restaurant>("restaurants", filter, update);
            Restaurant tt = db.FindOneAndUpdate<Restaurant>("restaurants", filter, update);

            FindOptions<Restaurant, Restaurant> options = new FindOptions<Restaurant>();
            options.Projection = Builders<Restaurant>.Projection.Include(r => r.address ).Include(r=>r.grades);
            foreach (var doc in db.Find<Restaurant>("restaurants", options))
            {
                Console.WriteLine(doc.address.street);
                Console.WriteLine(doc.grades[0].date);
                Console.WriteLine(doc.ts);
            }


            FindOptions<Restaurant, BsonDocument> options2 = new FindOptions<Restaurant, BsonDocument>();
            options2.Projection = Builders<Restaurant>.Projection.Include(r => r.address);
            foreach (var doc in db.Find<Restaurant, BsonDocument>("restaurants", options2))
            {
                 
               
            }

            FindOptions<Restaurant, AddressProjection> options3 = new FindOptions<Restaurant, AddressProjection>();
            options3.Projection = Builders<Restaurant>.Projection.Include(r => r.address);//傳回想要輸出的資料
            foreach (var doc in db.Find<Restaurant, AddressProjection>("restaurants", options3))
            {
                Console.WriteLine(doc.address.street);

            }
        }
        static void InsertOneByORM()
        {
            Restaurant restaurant = new Restaurant();
            restaurant.address = new Address { street = "jjjjjjjjjjjjjjj", zipcode = "88888", building = "50", coord = new List<double>() { 73.9557413, 40.7720266 } };
            restaurant.borough = "Manhattan Manhattan";
            restaurant.cuisine = "Italian Italian";
            restaurant.grades = new List<Grade>() { 
                new Grade { date = new DateTime(2014, 10, 1, 0, 0, 0, DateTimeKind.Utc), grade ="A",score=22} ,
                new Grade { date = new DateTime(2014, 1, 6, 0, 0, 0, DateTimeKind.Utc), grade ="B",score=11}
            };
            restaurant.name = "GOOOOOOO";
            restaurant.restaurant_id = "33333333333";
            restaurant.ts = MongoAccess.GetTimestamp();

            db.InsertOne<Restaurant>("restaurants", restaurant);

            
            foreach (var doc in db.Find<Restaurant>("restaurants"))
            {
                Console.WriteLine(doc.address.street);
                Console.WriteLine(doc.grades[0].date);
                Console.WriteLine(doc.ts);
            }


        }
        static void InsertOne()
        {
            BsonDocument document = new BsonDocument
                        {
                            { "address" , new BsonDocument
                                {
                                    { "street", "2 Gennudddddddd" },
                                    { "zipcode", "10075" },
                                    { "building", "1480" },
                                    { "coord", new BsonArray { 73.9557413, 40.7720266 } }
                                }
                            },
                            { "borough", "Manhattan" },
                            { "cuisine", "Italian" },
                            { "grades", new BsonArray
                                {
                                    new BsonDocument
                                    {
                                        { "date", new DateTime(2014, 10, 1, 0, 0, 0, DateTimeKind.Utc) },
                                        { "grade", "A" },
                                        { "score", 11 }
                                    },
                                    new BsonDocument
                                    {
                                        { "date", new DateTime(2014, 1, 6, 0, 0, 0, DateTimeKind.Utc) },
                                        { "grade", "B" },
                                        { "score", 17 }
                                    }
                                }
                            },
                            { "name", "Vella" },
                            { "restaurant_id", "41413123" },
                            {"ts", MongoAccess.GetTimestamp()}
                        };
           
            db.InsertOne<BsonDocument>("restaurants", document);

            //foreach (var doc in db.Find<BsonDocument>("restaurants").Result)
            //{
            //    Console.WriteLine(doc["address"]["street"]);
            //    Console.WriteLine(doc["grades"][0]["date"]);
            //}
            foreach (var doc in db.Find<BsonDocument>("restaurants"))
            {
                Console.WriteLine(doc["address"]["street"]);
                Console.WriteLine(doc["grades"][0]["date"]);
            }



            //using (IAsyncCursor<BsonDocument> cursor = db.Find<BsonDocument>("restaurants"))
            //{
            //    IEnumerable<BsonDocument> batch = cursor.Current;
            //    foreach (BsonDocument doc in batch)
            //    {
            //        // process document
            //        Console.WriteLine(doc["address"]["street"]);
            //        Console.WriteLine(doc["grades"][0]["date"]);
            //    }
            //}



        }

        static void RunCommand()
        {
            //BsonDocument document = new BsonDocument
            //            {
            //                { "eval", "addNumbers(1,6)" }
            //            };

            //var i = db.RunCommandAsync<BsonDocument>(document).Result;

            BsonDocument j = db.RunProcedureAsync<BsonDocument>("addNumbers", "1", "7").Result;
            BsonDocument k = db.RunProcedureAsync("addNumbers", "'1'", "7").Result;

            BsonDocument l = db.RunProcedure<BsonDocument>("addNumbers", "NumberLong(1)", "NumberLong(7)");
            BsonDocument g = db.RunProcedure("addNumbers", "'1'", "7");

            BsonDocument h = db.RunProcedure("addNumbers", "new Date('Jun 23, 1912')", "new Date('Jun 23, 1912')");

            BsonDocument o = db.RunProcedure("addNumbers", "new Timestamp(1412180887, 1)", "new Timestamp(1412180887, 1)");

            BsonDocument a = db.RunProcedure("addNumbers", "ObjectId('542c2b97bac0595474108b48')", "ObjectId('542c2b97bac0595474108b48')");

            BsonDocument y = db.RunProcedure("addNumbers", 1.1, 1.2);
            BsonDocument t = db.RunProcedure("addNumbers", DateTime.Now, DateTime.Now);
            //BsonDocument e = db.RunProcedure("addNumbers",'C', null, true, new ObjectId("542c2b97bac0595474108b48"), "eeeeeee", new DateTime(), 111111111111111111111111111m, 11111.0012334866244, 11);

            BsonDocument f = db.RunProcedure("addNumbers", "null", "null");
            //BsonDocument s = db.RunProcedure("addNumbers", DateTime.Now.ToString(), DateTime.Now.ToString());

        }
    }
}
