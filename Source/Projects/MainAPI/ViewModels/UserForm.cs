using System;
using System.ComponentModel.DataAnnotations;

namespace DFO.MainAPI.ViewModels
{
    public class UserForm
    {
        public Guid? Id { get; set; }

        [Required, MaxLength(50, ErrorMessage = "Invalid max length")]
        public string Name { get; set; }

        [Required, Range(0, 150, ErrorMessage = "Invalid age")]
        public int Age { get; set; }

        [MaxLength(50, ErrorMessage = "Invalid max length")]
        public string Address { get; set; }
    }
}
