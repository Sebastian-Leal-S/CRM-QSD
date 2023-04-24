$(function () {
  renderAllClient();

  // create and update client
  $('#clientsForm').on('submit', function (e) {
    e.preventDefault();

    const idClient = $(this).data('idclient');
    const update = $(this).data('updateclient');
    const client = $(this).serialize();

    if (update == false) {
      $.ajax({
        url: '/add/client',
        method: 'POST',
        data: client,
        success: function () {
          renderAllClient();
        },
      });
    } else if (update == true) {
      $.ajax({
        url: '/update/client/' + idClient,
        method: 'POST',
        data: client,
        success: function () {
          $('#clientsForm').attr('data-idClient', '');
          $('#clientsForm').attr('data-updateclient', 'false');
          renderAllClient();
        },
      });
    } else {
      console.log('Error en la ejecucion');
    }
  });

  function renderAllClient() {
    $.ajax({
      url: '/clients',
      method: 'GET',
      success: function (clients) {
        let tbody = $('#clientsTable');

        tbody.empty();
        clients.forEach(client => {
          tbody.append(`
            <tr id="${client._id}">
              <td>
                ${client.firstName}
              </td>
              <td>
               ${client.lastName}
              </td>
              <td>
               ${client.country}
              </td>
              <td>
               ${client.email}
              </td>
              <td>
               ${client.phone}
              </td>
              <td>
               ${client.regDate}
              </td>
              <td>
                <div class="btn-group" role="group">
                  <button class="btn btn-info btn-sm update-client">Actualizar</button>
                  <button class="btn btn-danger btn-sm delete-client">Eliminar</button>
                </div>
              </td>
            </tr>
          `);
        });
      },
    });
  }

  // get one client
  $('#clientsTable').on('click', '.update-client', function () {
    const tr = $(this).closest('tr');
    const id = tr.attr('id');

    $.ajax({
      url: '/client/' + id,
      method: 'GET',
      success: function (client) {
        $('.clientFormFirstName').val(client.firstName);
        $('.clientFormLastName').val(client.lastName);
        $('.clientFormCountry').val(client.country);
        $('.clientFormEmail').val(client.email);
        $('.clientFormPhone').val(client.phone);
        $('.clientFormRegDate').val(client.regDate);

        $('#clientsForm').attr('data-idClient', client._id);
        $('#clientsForm').attr('data-updateClient', 'true');
      },
    });
  });

  // delete client
  $('#clientsTable').on('click', '.delete-client', function () {
    const tr = $(this).closest('tr');
    const id = tr.attr('id');

    $.ajax({
      url: '/delete/client/' + id,
      method: 'DELETE',
      success: function (response) {
        renderAllClient();
        alert(response);
      },
    });
  });
});
