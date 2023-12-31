$(document).ready(function () {
  $(".doctor-button").click(function (e) {
    e.preventDefault();

    // Get the doctorId from the clicked element's data-doctor-id attribute
    const doctorId = $(this).data("doctor-id");

    // Make the AJAX request based on the obtained doctorId
    $.get(`/doctor/${doctorId}`, function (data) {
      // Update the HTML content based on the received JSON data
      // Update the episodes section
      if (data.episodes && data.episodes.length > 0) {
        var $olEpisodes = $("<ul/>");
        $.each(data.episodes, function (index, episode) {
          $olEpisodes.append($("<li/>").text(episode));
        });
        $("#episodes").empty().append($olEpisodes);
      } else {
        $("#episodes").empty().text("No episodes available.");
      }

      // Update the companions section
      if (data.companions && data.companions.length > 0) {
        var $companionContainer = $('<div class="row"/>');

        $.each(data.companions, function (index, companion) {
          // Create a column for each companion
          var $companionCol = $('<div class="col-md-4 mb-4"/>');

          // Create an image element for each companion
          var $companionImage = $(
            '<img class="img-fluid rounded" alt="' + companion.name + '">'
          );
          $companionImage.attr(
            "src",
            "assests/images/companions/" + companion.id + ".png"
          );

          // Create a paragraph element for the companion's name
          var $companionName = $(
            '<p class="text-center font-weight-bold mb-0"/>'
          ).text(companion.name);

          // Append image and name to the column
          $companionCol.append($companionImage, $companionName);

          // Append the column to the container
          $companionContainer.append($companionCol);
        });

        // Append the container to the companions section
        $("#companions").empty().append($companionContainer);
      } else {
        $("#companions").empty().text("No companions available.");
      }

      // If there are monsters, update the monsters section
      if (data.monsters && data.monsters.length > 0) {
        var $monsterContainer = $('<div class="row"/>');

        $.each(data.monsters, function (index, monster) {
          // Ensure that monster is an object with an ID and name
          if (
            monster &&
            typeof monster === "object" &&
            monster.id &&
            monster.name
          ) {
            // Create a column for each monster
            var $monsterCol = $('<div class="col-md-4 mb-4"/>');

            // Create an image element for each monster
            var $monsterImage = $(
              '<img class="img-fluid rounded" alt="' + monster.name + '">'
            );
            $monsterImage.attr(
              "src",
              "assests/images/monsters/" + monster.id + ".png"
            );

            // Create a paragraph element for the monster's name
            var $monsterName = $(
              '<p class="text-center font-weight-bold mb-0"/>'
            ).text(monster.name);

            // Append image and name to the column
            $monsterCol.append($monsterImage, $monsterName);

            // Append the column to the container
            $monsterContainer.append($monsterCol);
          }
        });

        // Append the container to the monsters section
        $("#notable-monsters").empty().append($monsterContainer);
      } else {
        $("#notable-monsters").empty().text("No notable monsters available.");
      }

      // Make the relevant section visible
      $(".invisible").removeClass("invisible");
    });
  });
});
