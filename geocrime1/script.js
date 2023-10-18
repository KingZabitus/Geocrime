document.addEventListener('DOMContentLoaded', async function() {
    const ocorrenciaList = document.getElementById('OcorrenciaList')

    const adicionarOcorrencia = async (ocorrencia) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ocorrencia)
        }
        await fetch("http://localhost:3000/pontos", options).then((res) => {
            console.log(res.json());
        });
        await exibirOcorrencias();
    }

    const buscarOcorrencias = async () => {
        const response = await fetch("http://localhost:3000/pontos");
        const data = await response.json();
        return data;
    }

    const deletarOcorrencia = async (ocorrenciaId) => {
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        }
        await fetch(`http://localhost:3000/pontos/${ocorrenciaId}`, options)
        .then((res) => {
            console.log(res.json());
            exibirOcorrencias();
        })
        .catch((error) => {
            console.error("erro ao deletar ocorrência:", error);
        })
    }


    const exibirOcorrencias = async () => {
        const ocorrenciasDoBanco = await buscarOcorrencias();
    
        const ocorrenciaHTML = ocorrenciasDoBanco.map((ocorrencia, index) => {
            const uniqueId = `mostradorDeLocal_${index}`;
            const deleteId = `deletarOcorrencia_${index}`;
            return `
                <div class="ocorrencia">
                    <p>Título: ${ocorrencia.titulo}</p>
                    <p>Tipo: ${ocorrencia.tipo}</p>
                    <p>Data e Hora: ${new Date(ocorrencia.dataHora).toLocaleString()}</p>
                    <p>Latitude: ${ocorrencia.lat}</p>
                    <p>Longitude: ${ocorrencia.lng}</p>
                    <button id="${uniqueId}" class="mostradorDeLocal">Mostrar Local</button>
                    <button id="${deleteId}" class="deletarOcorrencia">Deletar</button>
                </div>
            `;
        });
    
        ocorrenciaList.innerHTML += ocorrenciaHTML.join('');
    
        ocorrenciasDoBanco.map((ocorrencia, index) => {
            const uniqueId = `mostradorDeLocal_${index}`;
            const mostrarLocalBtn = document.getElementById(uniqueId);
            mostrarLocalBtn.addEventListener('click', () => {
                const lat = parseFloat(ocorrencia.lat);
                const lng = parseFloat(ocorrencia.lng);
                const position = { lat, lng };
    
                map.panTo(position);
                marcador.setPosition(position);
            });

            const deleteId = `deletarOcorrencia_${index}`
            const deletarButt = document.getElementById(deleteId);
            deletarButt.addEventListener('click', async () => {
                await deletarOcorrencia(ocorrencia.id);
                await exibirOcorrencias();
            });
        });
    };

    const form = document.getElementById('ocorrenciaForm');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        const nomeOcorrencia = document.getElementById('nomeOcorrencia').value;
        const descricaoOcorrencia = document.getElementById('descricaoOcorrencia').value;
        const dataHoraOcorrencia = document.getElementById('dataHoraOcorrencia').value;
        const latitudeOcorrencia = parseFloat(document.getElementById('latitudeOcorrencia').value);
        const longitudeOcorrencia = parseFloat(document.getElementById('longitudeOcorrencia').value);

        const novaOcorrencia = {
            titulo: nomeOcorrencia,
            tipo: descricaoOcorrencia,
            dataHora: dataHoraOcorrencia,
            lat: latitudeOcorrencia,
            lng: longitudeOcorrencia,
        };
        await adicionarOcorrencia(novaOcorrencia);

        document.getElementById('nomeOcorrencia').value = '';
        document.getElementById('descricaoOcorrencia').value = '';
        document.getElementById('dataHoraOcorrencia').value = '';
        document.getElementById('latitudeOcorrencia').value = '';
        document.getElementById('longitudeOcorrencia').value = '';
    });

    const mapDiv = document.querySelector(".map");
    let map;
    let marcador;

    async function iniciarMapa() {
        const { Map } = await google.maps.importLibrary("maps");
        let center = { lat: -6.889531952896556, lng: -38.54527473449707 };

        map = new Map(mapDiv, {
            center,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.DROP,
        });

        marcador = new google.maps.Marker({
            position: center,
            map,
            title: "Guardian Eye",
            animation: google.maps.Animation.DROP,
        });

        map.addListener('click', (event) => {
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();

            document.getElementById('latitudeOcorrencia').value = lat;
            document.getElementById('longitudeOcorrencia').value = lng;

            map.panTo(event.latLng);
            marcador.setPosition(event.latLng);
        });
    }

    if (typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
        iniciarMapa();
        await exibirOcorrencias();
    }
});