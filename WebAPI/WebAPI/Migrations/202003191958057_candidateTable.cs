namespace WebAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class candidateTable : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Candidate",
                c => new
                    {
                        CandidateID = c.Int(nullable: false, identity: true),
                        CandidateName = c.String(),
                        CandidateDOB = c.DateTime(),
                        CandidateDomain = c.String(),
                        CandidateProfileDoc = c.String(),
                    })
                .PrimaryKey(t => t.CandidateID);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Candidate");
        }
    }
}
