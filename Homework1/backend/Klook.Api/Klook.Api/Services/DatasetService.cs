using System.Text.Json;
using Klook.Api.Models;

namespace Klook.Api.Services;

public class DatasetService
{
    private readonly string _filePath;

    public DatasetService(IWebHostEnvironment environment)
    {
        _filePath = Path.Combine(environment.ContentRootPath, "Data", "tours.json");
    }

    public async Task<List<DatasetItem>> GetAllAsync()
    {
        if (!File.Exists(_filePath))
            return new List<DatasetItem>();

        var json = await File.ReadAllTextAsync(_filePath);

        if (string.IsNullOrWhiteSpace(json))
            return new List<DatasetItem>();

        return JsonSerializer.Deserialize<List<DatasetItem>>(json) ?? new List<DatasetItem>();
    }

    public async Task<DatasetItem?> GetByIdAsync(int id)
    {
        var items = await GetAllAsync();
        return items.FirstOrDefault(x => x.Id == id);
    }

    public async Task<DatasetItem> AddAsync(DatasetItem item)
    {
        var items = await GetAllAsync();
        item.Id = items.Count == 0 ? 1 : items.Max(x => x.Id) + 1;
        items.Add(item);
        await SaveAllAsync(items);
        return item;
    }

    public async Task<bool> UpdateAsync(int id, DatasetItem updated)
    {
        var items = await GetAllAsync();
        var item = items.FirstOrDefault(x => x.Id == id);

        if (item == null)
            return false;

        item.Tab = updated.Tab;
        item.Category = updated.Category;
        item.Location = updated.Location;
        item.Title = updated.Title;
        item.Badges = updated.Badges;
        item.Rating = updated.Rating;
        item.Price = updated.Price;
        item.Image = updated.Image;

        await SaveAllAsync(items);
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var items = await GetAllAsync();
        var item = items.FirstOrDefault(x => x.Id == id);

        if (item == null)
            return false;

        items.Remove(item);
        await SaveAllAsync(items);
        return true;
    }

    private async Task SaveAllAsync(List<DatasetItem> items)
    {
        Directory.CreateDirectory(Path.GetDirectoryName(_filePath)!);

        var json = JsonSerializer.Serialize(items, new JsonSerializerOptions
        {
            WriteIndented = true
        });

        await File.WriteAllTextAsync(_filePath, json);
    }
}
