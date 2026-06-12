using InventarioCCL.API.DTOs;
using InventarioCCL.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace InventarioCCL.API.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly TokenService _tokenService;
    private readonly IConfiguration _config;

    public AuthController(TokenService tokenService, IConfiguration config)
    {
        _tokenService = tokenService;
        _config = config;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginDto dto)
    {
        // las credenciales estan en appsettings para no dejarlas quemadas
        var user = _config["Auth:Usuario"];
        var pass = _config["Auth:Password"];

        if (dto.Usuario != user || dto.Password != pass)
            return Unauthorized(new { mensaje = "Credenciales incorrectas" });

        var token = _tokenService.GenerarToken(dto.Usuario);
        return Ok(new { token });
    }
}