using InventarioCCL.API.Models;
using Microsoft.EntityFrameworkCore;

namespace InventarioCCL.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Producto> Productos { get; set; }
    public DbSet<Movimiento> Movimientos { get; set; }
}