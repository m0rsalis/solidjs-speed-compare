using System.Text.Json.Serialization;

namespace DataAPI.Dto
{
    public class DogBreedsResponse
    {
        [JsonPropertyName("message")]
        public Dictionary<string, List<string>> Breeds { get; set; }
        [JsonPropertyName("status")]
        public string Status { get; set; }
    }
}
