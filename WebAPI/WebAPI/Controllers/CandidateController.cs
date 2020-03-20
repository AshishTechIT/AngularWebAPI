using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class CandidateController : ApiController
    {
        ApplicationDbContext objEntity = new ApplicationDbContext();
        // GET: api/CandidateList
        public IQueryable<CandidateModel> CandidateList()
        {

            return objEntity.Candidate;
        }

        // GET: api/Candidate/5
        public IHttpActionResult Get(int id)
        {
            CandidateModel objCandidate = new CandidateModel();
            int ID = Convert.ToInt32(id);
            try
            {
                objCandidate = objEntity.Candidate.Find(ID);
                if (objCandidate == null)
                {
                    return NotFound();
                }

            }
            catch (Exception)
            {
                throw;
            }

            return Ok(objCandidate);
        }

        // POST: api/Candidate
        [HttpPost]
        [Route("InsertCandidateDetails")]
        public IHttpActionResult Post(CandidateModel objCandidate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                objEntity.Candidate.Add(objCandidate);
                objEntity.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }

            return Ok(objCandidate);

        }

        // PUT: api/Candidate/5
        public IHttpActionResult Put(CandidateModel candidate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                CandidateModel objCandidate = new CandidateModel();
                objCandidate = objEntity.Candidate.Find(candidate.CandidateID);
                if (objCandidate != null)
                {
                    objCandidate.CandidateName = candidate.CandidateName;
                    objCandidate.CandidateDOB = candidate.CandidateDOB;
                    objCandidate.CandidateDomain = candidate.CandidateDomain;
                    objCandidate.CandidateProfileDoc = candidate.CandidateProfileDoc;
                }
                int i = this.objEntity.SaveChanges();

            }
            catch (Exception)
            {
                throw;
            }
            return Ok(candidate);
        }

        // DELETE: api/Candidate/5
        public IHttpActionResult Delete(int id)
        {
            CandidateModel candidate = objEntity.Candidate.Find(id);
            if (candidate == null)
            {
                return NotFound();
            }

            objEntity.Candidate.Remove(candidate);
            objEntity.SaveChanges();

            return Ok(candidate);
        }
    }
}
