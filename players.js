$(function () {

  let getPlayersName = () => {
    const players = [];
    $('input[name=player]').each((idx, name) => {
      if ($(name).val() !== '') {
        players.push($(name).val())
      }
    });
    return players;
  }

  let modalHidden = () => {
    $('.modal').css('display', 'none');
  }

  let uniqueArray = (playersArr) => {
    return playersArr.filter((currentValue, idx, arr) => arr.indexOf(currentValue) === idx);
  }


  let addPlayerCards = (players) => {
    $('.playerCards').children().remove();
    players.map((player) => {
      $('.playerCards').append(`<div class="card"><header>${player}</header></div>`);
    })
  }

  $(".add").click(() => {
    const players = $('input').val();
    $('.modal').css('display', 'block');
  })

  $('.addMorePlayers').click(() => {
    if ($('.enterNameInputs input').length > 5) {
      $('.enterNameInputs').append('<p class="hint">Maximum number of players allowed is 6!</p>');
      $('.addMorePlayers').attr('disabled', 'disabled');
      return;
    }
    $('.enterNameInputs').append('<input placeholder="Name"  name="player" />')
  })

  $('.cancel').click(() => {
    modalHidden();
  })

  $('.save').click(() => {
    const players = getPlayersName();
    const uniquePlayers = uniqueArray(players);
    modalHidden();
    addPlayerCards(uniquePlayers);
  })

});