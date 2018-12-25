using System;
using System.Linq;
using System.Collections.Generic;
using DFO.MainAPI.Models;
using DFO.MainAPI.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace DFO.MainAPI.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly MainSettings settings;
        private static List<User> _Users = new List<User>();

        static UserController()
        {
            var names = new string[] { "Marcella Glover", "Rebecca Lasseter", "Margherita Tower", "Coretta Stallman", "Reatha Matton", "Alysha Macken", "Imelda Pillar", "Robena Kisling", "Alleen Scheel", "Danyelle Mendivil", "Alida Herman", "Milford Fullmer", "Sharlene Teasley", "Chanel Fleishman", "Deangelo Palka", "Pansy Vinyard", "Juli Abramowitz", "Cherry Pratico", "Nerissa Bunyard", "Karyl Nolette", "Antonio Capello", "Ji Sizemore", "Shelton Rieck", "Donnette Mancha", "Lavonia Belliveau", "Nicholle Rierson", "Barbera Zynda", "Francesco Goll", "Dahlia Vue", "Marshall Margulies", "Laurena Krell", "Reggie Walther", "Gennie Kenny", "Sharice Glorioso", "Jeffie Cloyd", "Etta Selvey", "Sammy Maziarz", "Sylvester Kauffman", "Sybil Collelo", "Eugenia Huneycutt", "Renee Lines", "Cristy Eldred", "Ligia Banton", "Freddie Szewczyk", "Cesar Lane", "Cherise Muise", "Lizzie Christofferso", "Dia Yoshioka", "Audrea Parada", "Shelba Dykeman" };
            var random = new Random();

            foreach (var name in names)
            {
                _Users.Add(new User
                {
                    Id = Guid.NewGuid(),
                    Name = name,
                    Age = random.Next(1, 100),
                    Address = string.Format("{0} {1} St.", random.Next(1, 1000), names[random.Next(0, 49)])
                });
            }
        }

        public UserController(IOptionsSnapshot<MainSettings> settings)
        {

            this.settings = settings.Value;
        }

        // POST api/values
        [HttpGet, Route("get")]
        public IActionResult GetUser(Guid Id)
        {
            try
            {
                return Ok(_Users.Find(obj => obj.Id == Id));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    Message = ex.Message
                });
            }
        }

        [HttpGet, Route("get-all")]
        public IActionResult GetAllUsers()
        {
            try
            {
                return Ok(_Users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    Message = ex.Message
                });
            }
        }

        [HttpPost, Route("edit")]
        public IActionResult Edit([FromBody]UserForm model)
        {
            try
            {
                if (ModelState.IsValid == false)
                {
                    return BadRequest(new { message = ModelState.Values.SelectMany(obj => obj.Errors).FirstOrDefault().ErrorMessage });
                }

                if (model.Id == null)
                {
                    return BadRequest(new { message = "Invalid Id" });
                }

                var user = _Users.Find(obj => obj.Id == model.Id);

                if (user == null)
                {
                    return BadRequest(new { message = "User not exist" });
                }

                user.Name = model.Name;
                user.Age = model.Age;
                user.Address = model.Address;

                return Ok(new { status = "success" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    Message = ex.Message
                });
            }
        }

        [HttpPost, Route("create")]
        public IActionResult Create([FromBody]UserForm model)
        {
            try
            {
                if (ModelState.IsValid == false)
                {
                    return BadRequest(new { message = ModelState.Values.SelectMany(obj => obj.Errors).FirstOrDefault().ErrorMessage });
                }

                var user = _Users.Find(obj => obj.Id == model.Id);

                if (user != null)
                {
                    return BadRequest(new { message = "User exist" });
                }

                var id = Guid.NewGuid();

                _Users.Add(new User
                {
                    Id = id,
                    Name = model.Name,
                    Age = model.Age,
                    Address = model.Address
                });

                return Ok(new { Id = id });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    Message = ex.Message
                });
            }
        }
    }
}
