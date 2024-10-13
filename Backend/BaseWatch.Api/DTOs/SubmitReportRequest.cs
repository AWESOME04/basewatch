using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BaseWatch.Api.DTOs
{
    public class SubmitReportRequest
    {
        public string Content { get; set; }
        public string ReportType { get; set; }
        public string Proof { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
    }
}