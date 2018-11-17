﻿namespace RefitBasicDemo
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Refit;
    
    public interface IPersonsApi
    {
        [Get("/api/persons")]
        Task<List<Person>> GetPersonsAsync();

        [Get("/api/persons/{id}")]
        Task<Person> GetPersonAsync(int id);

        [Post("/api/persons")]
        Task<Person> AddPersonAsync([Body]Person person);

        [Put("/api/persons")]
        Task<string> EditPersonAsync([Body]int id);

        [Delete("/api/persons/{id}")]
        Task<string> DeletePersonAsync(int id);
    }
}
