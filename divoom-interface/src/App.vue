<script setup>
import { ref } from 'vue';

const pixelData = ref([
    [
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295
    ],
    [
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295
    ],
    [
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295
    ],
    [
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295
    ],
    [
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295
    ],
    [
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295
    ],
    [
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295
    ],
    [
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295
    ],
    [
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295
    ],
    [
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295
    ],
    [
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295
    ],
    [
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295
    ],
    [
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295
    ],
    [
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295
    ],
    [
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295
    ],
    [
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295,
        4294967295
    ]
]);
const color = ref("#FFFFFF");
console.log(window.location);
let ws = new WebSocket(window.location.origin.replace(/^http/, 'ws'));

ws.onopen = () => {
  console.log('Connected to the WebSocket server');
  ws.send('{"action":"pixels"}');
};
ws.onmessage = (event) => {
  pixelData.value = JSON.parse(event.data);
};


async function clickedIndex(rowIndex, pixelIndex) {
  console.log(color.value);
  ws.send("{" + `"action":"pixel", "x":${pixelIndex}, "y":${rowIndex}, "color":${parseInt(color.value.slice(1), 16) * 256 + 255}` + "}");
  update();
}

async function update() {
  // const response = await fetch("/pixels");

  ws.send('{"action":"pixels"}');
  // pixelData.value = await response.json();
}

setInterval(() => {
  console.log("Updating..");
  update();
}, 1500);


update();


function getColorAt(rowIndex, pixelIndex) {
  // console.log(pixelData.value[rowIndex][pixelIndex]);

  if (pixelData.value[rowIndex][pixelIndex] == 255) {
    return "#000000"
  }
  if (typeof pixelData.value[rowIndex][pixelIndex] == String) {
    return pixelData.value[rowIndex][pixelIndex].padStart(8, '0');
  } else {
    return "#" + (parseInt(pixelData.value[rowIndex][pixelIndex])).toString(16).padStart(8, '0');
  }
}

</script>

<template>
  <div class="global-container">
    <h1>My Display</h1>
    <div class="grid-container">
      <div v-for="(pixelRow, rowIndex) in pixelData" :key="pixelRow" class="row">
        <div v-for="(pixel, pixelIndex) in pixelRow" :key="pixel" class="pixel">
          <button @click="clickedIndex(rowIndex, pixelIndex)" :style="{ 'background-color': getColorAt(rowIndex, pixelIndex)}"></button>
        </div>
      </div>
    </div>
    <input type="color" value="#FFFFFF" name="" id="" @input="event => color = event.target.value">

  </div>
  <p>This is a website where you can control the little Divoom Timebox Evo on my desk and display anything you want. Pick a color with the color picker and click on squares to get started</p>

</template>

<style scoped>
.global-container {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
}

h1, p {
  text-align: center;
}

p {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%);
}
input {
  position: relative;
  left: 50%;
  transform: translate(-50%);
}

.grid-container {
  display: flex;
  margin: 0;
}
.grid-container * {
  margin: 0;
  padding: 0;
}

button {
  width: 20px;
  height: 20px;
  margin: 0;
  padding: 0;
  border: 1px solid black;
}
.row {
}
.pixel {
  height: 20px;
  width: 20px;
}
</style>
