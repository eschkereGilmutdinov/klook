namespace Klook.Api.Models;

public class ToursFiltersResponse
{
    public List<string> Tabs { get; set; } = new();
    public List<string> Categories { get; set; } = new();
    public List<string> Locations { get; set; } = new();
    public List<string> Badges { get; set; } = new();
}