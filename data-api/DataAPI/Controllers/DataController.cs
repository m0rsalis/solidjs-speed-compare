using DataAPI.Dto;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace DataAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DataController : ControllerBase
    {
        private List<string> Hounds = new List<string> { "Filip", "Vojta", "Martin", "Tom", "Honza", "Jirka" };

        public DataController()
        {
        }

        [HttpGet]
        public async Task<IEnumerable<Hound>> Get([FromQuery]int count = 10000)
        {
            var dogBreeds = await GetDogBreeds();

            return Enumerable.Range(1, count).Select(index => new Hound
            {
                Id = index,
                Name = Hounds[Random.Shared.Next(Hounds.Count)],
                Breed = dogBreeds[Random.Shared.Next(dogBreeds.Count)],
                Description = LoremNET.Lorem.Words(30, 35)
            }).ToArray();
        }

        private async Task<List<string>> GetDogBreeds()
        {
            var client = new HttpClient();
            var response = await client.GetStringAsync("https://dog.ceo/api/breeds/list/all");

            var dogBreedsResponse = JsonSerializer.Deserialize<DogBreedsResponse>(response);
            return dogBreedsResponse.Breeds.Keys.ToList();
        }
    }
}