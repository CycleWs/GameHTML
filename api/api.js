// Função para carregar a API do YouTube e, em seguida, chamar a função para listar vídeos do canal
function iniciarAPIYouTubeEListarVideos(idDoCanal) {
    const apiKey = process.env.API_KEY_STRING;
    gapi.load('client', function() {
      gapi.client.init({
        'apiKey': apiKey,
        'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
      }).then(function() {
        console.log('API do YouTube inicializada com sucesso!');
        listarVideosDoCanal(idDoCanal); // Chamada para listar vídeos do canal após a inicialização da API
      }, function(err) {
        console.error('Erro ao inicializar API do YouTube: ' + err);
      });
    });
  }
  
  // Função para listar todos os vídeos de um canal e armazenar os links e datas em uma lista
  var videosList = []; // Lista para armazenar os links dos vídeos e suas datas
  var embedVideo = [];
  function listarVideosDoCanal(idDoCanal) {
  
    gapi.client.youtube.search.list({
      'part': 'snippet',
      'channelId': idDoCanal,
      'order': 'date',
      'type': 'video',
      'maxResults': 5 // Número máximo de resultados por página (máximo é 50)
    }).then(function(response) {
      var videos = response.result.items;
      if (videos.length > 0) {
        for (var i = 0; i < videos.length; i++) {
          var video = videos[i];
          var titulo = video.snippet.title;
          var dataDePublicacao = video.snippet.publishedAt;
          var videoId = video.id.videoId;
          var videoLink = 'https://www.youtube.com/watch?v=' + videoId;
          videosList.push({ 'titulo': titulo, 'dataDePublicacao': dataDePublicacao, 'videoLink': videoLink });
          obterCodigoDeIncorporacaoDoVideo(videoId);
        }
        console.log(embedVideo);
        console.log('Lista de vídeos:', videosList);
      } else {
        console.error('Nenhum vídeo encontrado para o canal:', idDoCanal);
      }
    }, function(err) {
      console.error('Erro ao listar vídeos do canal:', err);
    });
  }

  function obterCodigoDeIncorporacaoDoVideo(idDoVideo) {
    gapi.client.youtube.videos.list({
      'part': 'player',
      'id': idDoVideo
    }).then(function(response) {
      var video = response.result.items[0];
      var codigoDeIncorporacao = video.player.embedHtml;
    //   console.log('Código de Incorporação:', codigoDeIncorporacao);
      embedVideo.push(codigoDeIncorporacao);
    }, function(err) {
      console.error('Erro ao obter o código de incorporação do vídeo:', err);
    });
  }
    
  // Exemplo de uso: substitua 'ID_DO_CANAL' pelo ID do canal desejado
  iniciarAPIYouTubeEListarVideos('UCnU2EtUW8Z4DxSqXxJ5cMQg'); 