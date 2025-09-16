using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.IO;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSpaStaticFiles(cfg => cfg.RootPath = "wwwroot"); // React build output
var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();
app.UseSpaStaticFiles();

app.MapGet("/health", () => Results.Ok(new { ok = true }));

app.MapGet("/data/{*file}", (string file, HttpContext ctx) =>
{
    var path = Path.Combine(AppContext.BaseDirectory, "data", file);
    if (!System.IO.File.Exists(path)) return Results.NotFound();

    var provider = new Microsoft.AspNetCore.StaticFiles.FileExtensionContentTypeProvider();
    if (!provider.TryGetContentType(path, out var contentType))
        contentType = "application/octet-stream";

    ctx.Response.Headers.CacheControl = "no-cache, no-store, must-revalidate";
    ctx.Response.Headers.Pragma = "no-cache";
    ctx.Response.Headers.Expires = "0";

    return Results.File(path, contentType);
});


app.MapFallbackToFile("index.html");
app.Run();
