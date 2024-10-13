using BaseWatch.Api.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class CrimeReportController : ControllerBase
{
    private readonly CrimeReportService _crimeReportService;

    public CrimeReportController(CrimeReportService crimeReportService)
    {
        _crimeReportService = crimeReportService;
    }

    [HttpPost("submit")]
    public async Task<IActionResult> SubmitReport([FromBody] SubmitReportRequest request)
    {
        var txHash = await _crimeReportService.SubmitReport(request.Content, request.ReportType, request.Proof, request.Latitude, request.Longitude);
        return Ok(new { TransactionHash = txHash });
    }

    [HttpPost("validate")]
    public async Task<IActionResult> ValidateReport([FromBody] ValidateRejectRequest request)
    {
        var txHash = await _crimeReportService.ValidateReport(request.ReportId);
        return Ok(new { TransactionHash = txHash });
    }

    [HttpPost("reject")]
    public async Task<IActionResult> RejectReport([FromBody] ValidateRejectRequest request)
    {
        var txHash = await _crimeReportService.RejectReport(request.ReportId);
        return Ok(new { TransactionHash = txHash });
    }

    [HttpGet("reputation/{validatorAddress}")]
    public async Task<IActionResult> GetReputation(string validatorAddress)
    {
        var reputation = await _crimeReportService.GetReputation(validatorAddress);
        return Ok(new { ReputationScore = reputation });
    }
}


