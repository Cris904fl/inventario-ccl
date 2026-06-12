using InventarioCCL.API.Data;
using InventarioCCL.API.DTOs;
using InventarioCCL.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InventarioCCL.API.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize]
public class ProductosController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProductosController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost("movimiento")]
    public async Task<IActionResult> RegistrarMovimiento([FromBody] MovimientoDto dto)
    {
        var producto = await _context.Productos.FindAsync(dto.ProductoId);
        if (producto == null)
            return NotFound(new { mensaje = "Producto no encontrado" });

        if (dto.Tipo == "salida" && producto.Cantidad < dto.Cantidad)
            return BadRequest(new { mensaje = "Stock insuficiente" });

        if (dto.Tipo == "entrada")
            producto.Cantidad += dto.Cantidad;
        else if (dto.Tipo == "salida")
            producto.Cantidad -= dto.Cantidad;
        else
            return BadRequest(new { mensaje = "Tipo debe ser 'entrada' o 'salida'" });

        _context.Movimientos.Add(new Movimiento
        {
            ProductoId = dto.ProductoId,
            Tipo = dto.Tipo,
            Cantidad = dto.Cantidad
        });

        await _context.SaveChangesAsync();
        return Ok(new { mensaje = "Movimiento registrado", stockActual = producto.Cantidad });
    }

    [HttpGet("inventario")]
    public async Task<IActionResult> GetInventario()
    {
        var productos = await _context.Productos.ToListAsync();
        return Ok(productos);
    }
}