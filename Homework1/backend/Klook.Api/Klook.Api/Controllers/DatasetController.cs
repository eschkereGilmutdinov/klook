using Microsoft.AspNetCore.Mvc;
using Klook.Api.Models;
using Klook.Api.Services;

namespace Klook.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DatasetController : ControllerBase
{
    private readonly DatasetService _service;

    public DatasetController(DatasetService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<List<DatasetItem>>> GetAll()
    {
        return Ok(await _service.GetAllAsync());
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<DatasetItem>> GetById(int id)
    {
        var item = await _service.GetByIdAsync(id);

        if (item == null)
            return NotFound();

        return Ok(item);
    }

    [HttpPost]
    public async Task<ActionResult<DatasetItem>> Create([FromBody] DatasetItem item)
    {
        var created = await _service.AddAsync(item);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] DatasetItem item)
    {
        var ok = await _service.UpdateAsync(id, item);

        if (!ok)
            return NotFound();

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var ok = await _service.DeleteAsync(id);

        if (!ok)
            return NotFound();

        return NoContent();
    }
}