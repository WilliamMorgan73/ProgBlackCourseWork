$(document).ready(function() {
  $('.doctor-button').click(function(e) {
      e.preventDefault();

      // Get the doctorId from the clicked element's data-doctor-id attribute
      const doctorId = $(this).data('doctor-id');

      // Make the AJAX request based on the obtained doctorId
      $.get(`/doctor/${doctorId}`, function(data) {
          // Update the HTML content based on the received JSON data
          // Create a new unordered list for serials
          var $ul = $('<ul/>');

          // Loop through the stories (serials)
          $.each(data.stories, function(index, story) {
              // Create a new list item for each serial and append it to the unordered list
              var $li = $('<li/>').text(story.serial);

              // Create a new ordered list for episodes within the serial
              var $ol = $('<ol/>');

              // Loop through the episodes
              $.each(story.episodes, function(index, episode) {
                  // Create a new list item for each episode and append it to the ordered list
                  $ol.append($('<li/>').text(episode));
              });

              // Append the ordered list (episodes) to the serial's list item
              $li.append($ol);

              // Append the serial's list item to the unordered list
              $ul.append($li);
          });

          // Set the text for the title and append the unordered list to the #episodes element
          $('#episodes').empty().append('Episodes: ', $ul);
          $('#companions').text('Companions: ' + data.companions.join(', '));
      });
  });
});
