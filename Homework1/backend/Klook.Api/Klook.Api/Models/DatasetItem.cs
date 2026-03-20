using System.Text.Json.Serialization;

namespace Klook.Api.Models
{
    public class DatasetItem
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("tab")]
        public string Tab { get; set; } = string.Empty;

        [JsonPropertyName("category")]
        public string Category { get; set; } = string.Empty;

        [JsonPropertyName("location")]
        public string? Location { get; set; }

        [JsonPropertyName("title")]
        public string Title { get; set; } = string.Empty;

        [JsonPropertyName("badges")]
        public TourBadges Badges { get; set; } = new();

        [JsonPropertyName("rating")]
        public TourRating Rating { get; set; } = new();

        [JsonPropertyName("price")]
        public TourPrice Price { get; set; } = new();

        [JsonPropertyName("image")]
        public TourImage Image { get; set; } = new();
    }

    public class TourBadges
    {
        [JsonPropertyName("primary")]
        public List<string> Primary { get; set; } = new();

        [JsonPropertyName("promotional")]
        public List<string> Promotional { get; set; } = new();
    }

    public class TourRating
    {
        [JsonPropertyName("score")]
        public double? Score { get; set; }

        [JsonPropertyName("reviews_count")]
        public int? ReviewsCount { get; set; }

        [JsonPropertyName("booked_count_text")]
        public string? BookedCountText { get; set; }
    }

    public class TourPrice
    {
        [JsonPropertyName("from")]
        public decimal From { get; set; }

        [JsonPropertyName("currency")]
        public string Currency { get; set; } = string.Empty;

        [JsonPropertyName("display_text")]
        public string DisplayText { get; set; } = string.Empty;

        [JsonPropertyName("original_text")]
        public string? OriginalText { get; set; }
    }

    public class TourImage
    {
        [JsonPropertyName("url")]
        public string Url { get; set; } = string.Empty;
    }
}