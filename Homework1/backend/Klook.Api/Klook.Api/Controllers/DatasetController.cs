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
    public async Task<ActionResult<List<DatasetItem>>> GetAll()
    {
        var tours = await _service.GetAllAsync();
        return Ok(tours);
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
