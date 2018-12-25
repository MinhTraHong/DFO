using System;
using System.ComponentModel.DataAnnotations;

namespace DFO.MainAPI.Models
{
    public class User
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public int Age { get; set; }

        public string Address { get; set; }
    }
}
