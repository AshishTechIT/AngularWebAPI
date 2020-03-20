using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;
using WebAPI.Models;
namespace WebAPI.Migrations
{
    public class CandidateConfiguration: EntityTypeConfiguration<CandidateModel>
    {
        public CandidateConfiguration()
            : base()
        {
            HasKey(p => p.CandidateID);
            ToTable("Candidate");    
                    
        }
    }
}