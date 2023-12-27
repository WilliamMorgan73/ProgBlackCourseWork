$(document).ready(function() {
    $('.doctor-button').click(function(e) {
      e.preventDefault();
  
      // Get the doctorId from the clicked element's data-doctor-id attribute
      const doctorId = $(this).data('doctor-id');
  
      // Make the AJAX request based on the obtained doctorId
      $.get(`/doctor/${doctorId}`, function(data) {
        // Update the HTML content based on the received JSON data
        $('#doctor-name').text(data.name);
        $('#episodes').text('Episodes: ' + data.episodes.join(', '));
        $('#companions').text('Companions: ' + data.companions.join(', '));
      });
    });
  });
  