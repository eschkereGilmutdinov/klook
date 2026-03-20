using Klook.Api.Models;
using Klook.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Klook.Api.Controllers;

[ApiController]
[Route("tours")]
public class ToursController : ControllerBase
{
    private readonly DatasetService _service;

    public ToursController(DatasetService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<List<DatasetItem>>> GetAll(
        [FromQuery] string? tab,
        [FromQuery] List<string>? categories,
        [FromQuery] string? location,
        [FromQuery] string? badge,
        [FromQuery] bool instantConfirmationOnly = false,
        [FromQuery] decimal? minPrice = null,
        [FromQuery] decimal? maxPrice = null,
        [FromQuery] string? dateFilter = null)
    {
        var tours = await _service.GetAllAsync();
        IEnumerable<DatasetItem> query = tours;

        if (!string.IsNullOrWhiteSpace(tab))
        {
            query = query.Where(x =>
                !string.IsNullOrWhiteSpace(x.Tab) &&
                x.Tab.Equals(tab, StringComparison.OrdinalIgnoreCase));
        }

        if (categories != null && categories.Any())
        {
            var normalizedCategories = categories
                .Where(x => !string.IsNullOrWhiteSpace(x))
                .Select(x => x.Trim().ToLower())
                .ToList();

            query = query.Where(x =>
                !string.IsNullOrWhiteSpace(x.Category) &&
                normalizedCategories.Contains(x.Category.Trim().ToLower()));
        }

        if (!string.IsNullOrWhiteSpace(location))
        {
            query = query.Where(x =>
                !string.IsNullOrWhiteSpace(x.Location) &&
                x.Location.Equals(location, StringComparison.OrdinalIgnoreCase));
        }

        if (!string.IsNullOrWhiteSpace(badge))
        {
            query = query.Where(x =>
                x.Badges.Primary.Any(b => b.Equals(badge, StringComparison.OrdinalIgnoreCase)) ||
                x.Badges.Promotional.Any(b => b.Equals(badge, StringComparison.OrdinalIgnoreCase)));
        }

        if (instantConfirmationOnly)
        {
            query = query.Where(x =>
                x.Badges.Primary.Any(b => b.Equals("instant confirmation", StringComparison.OrdinalIgnoreCase)));
        }

        if (minPrice.HasValue)
        {
            query = query.Where(x => x.Price.From >= minPrice.Value);
        }

        if (maxPrice.HasValue)
        {
            query = query.Where(x => x.Price.From <= maxPrice.Value);
        }

        if (!string.IsNullOrWhiteSpace(dateFilter))
        {
            if (dateFilter.Equals("today", StringComparison.OrdinalIgnoreCase))
            {
                query = query.Where(x =>
                    x.Badges.Primary.Any(b => b.Equals("book now for today", StringComparison.OrdinalIgnoreCase)));
            }
            else if (dateFilter.Equals("tomorrow", StringComparison.OrdinalIgnoreCase))
            {
                query = query.Where(x =>
                    x.Badges.Primary.Any(b => b.Equals("book now for tomorrow", StringComparison.OrdinalIgnoreCase)));
            }
        }

        return Ok(query.ToList());
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<DatasetItem>> GetById(int id)
    {
        var item = await _service.GetByIdAsync(id);

        if (item == null)
            return NotFound();

        return Ok(item);
    }

    [HttpGet("filters")]
    public async Task<ActionResult<ToursFiltersResponse>> GetFilters()
    {
        var tours = await _service.GetAllAsync();

        var response = new ToursFiltersResponse
        {
            Tabs = tours
                .Select(x => x.Tab)
                .Where(x => !string.IsNullOrWhiteSpace(x))
                .Distinct()
                .OrderBy(x => x)
                .ToList(),

            Categories = tours
                .Select(x => x.Category)
                .Where(x => !string.IsNullOrWhiteSpace(x))
                .Distinct()
                .OrderBy(x => x)
                .ToList(),

            Locations = tours
                .Select(x => x.Location)
                .Where(x => !string.IsNullOrWhiteSpace(x))
                .Select(x => x!)
                .Distinct()
                .OrderBy(x => x)
                .ToList(),

            Badges = tours
                .SelectMany(x => x.Badges.Primary.Concat(x.Badges.Promotional))
                .Where(x => !string.IsNullOrWhiteSpace(x))
                .Distinct()
                .OrderBy(x => x)
                .ToList()
        };

        return Ok(response);
    }
}
