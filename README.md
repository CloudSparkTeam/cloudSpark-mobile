# cloudSpark-mobile
# Aplicativo Mobile

Este serviço é responsável por estruturar a plataforma para dispositivos móveis, utilizando **React Native CLI**.

## Pré-requisitos

Antes de rodar o projeto, certifique-se de ter o seguinte configurado:

- **Node.js** e **npm** instalados. Se ainda não tiver, acesse [Node.js](https://nodejs.org/pt) e faça o download da versão mais recente.
- **Android Studio** com o **Android SDK** instalado, ou um emulador/simulador de dispositivo configurado no Visual Studio Code.
- Alternativamente, você pode utilizar um **dispositivo físico** com Android, conectado via cabo USB e com a depuração USB ativada.

## Como Rodar

Siga os passos abaixo para rodar o aplicativo mobile localmente:

1. **Clone o repositório:**

   Clone o projeto utilizando o comando:

   ```bash
   git clone https://github.com/CloudSparkTeam/cloudSpark-mobile.git

2. **Navegue até a pasta do projeto:**

   Vá até o diretório onde o repositório foi clonado:
   ```bash
   cd cloudSpark-mobile

3. **Instale as dependências:**

   Execute o seguinte comando para instalar todas as dependências necessárias:
   ```bash
   npm install

4. **Configuração do Emulador ou Dispositivo Físico:**

   Usando um Emulador Android:
   Certifique-se de que o Android Studio esteja configurado com o Android SDK.

   Inicie um emulador Android pelo Android Studio ou pelo terminal:

   ```bash
   npx react-native run-android
   ```

   Usando um Dispositivo Físico:
   Conecte seu dispositivo Android ao computador via cabo USB.

   Ative a depuração USB nas configurações do desenvolvedor no seu dispositivo.

   Verifique se o dispositivo está listado com o comando:

   ```bash
   adb devices
   ```
   Inicie o aplicativo no dispositivo conectado:
   ```bash
   npx react-native run-android

5. **Inicie o aplicativo:**

   Com o emulador ou dispositivo físico configurado e o ambiente pronto, inicie o aplicativo com o comando:
   ```bash
   npm start