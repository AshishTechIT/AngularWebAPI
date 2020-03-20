using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class CandidateModel
    {
        public string CandidateName { get; set; }
        public int CandidateID { get; set; }
        public Nullable<System.DateTime> CandidateDOB { get; set; }
        public string CandidateDomain { get; set; }
        public string CandidateProfileDoc { get; set; }
    }
}