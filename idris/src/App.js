import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Stage,Circle,Layer,Group, Rect, Shape, Line} from 'react-konva';
import { render } from 'react-dom';

function App() {
  const jump=()=>{
    alert("i dey there")
  }
const [tool,setTool] = React.useState('pen');
const [ lines,setLines] = React.useState([])
const isDrawing = React.useRef(false)

const handleMouseDown = (e) => {
  isDrawing.current = true;
  const pos = e.target.getStage().getPointerPosition();
  setLines([ ...lines, { tool,points:[pos.x,pos.y]}])
}
const handleMouseMove = (e) => {
  if(!isDrawing.current){
    return;
  }
  const stage = e.target.getStage()
  const point = stage.getPointerPosition()
  let lastline = lines[ lines.length -1]
  lastline.points = lastline.points.concat([ point.x,point.y])

  lines.splice(lines.length -1,1,lastline)
  setLines(lines.concat())
}

const handleMouseUp = ()=>{
  isDrawing.current = false;
}
  return (
  
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
      </header> 
      <div id = " contain">  
      <script> </script>
      <button> small</button>
      <button> medium</button>
      <button onClick = {jump}> large</button>
      </div>
<Stage width = {window.innerWidth} height = { window.innerHeight} 
onMouseDown = { handleMouseDown}
onMouseMove = { handleMouseMove}
onMouseUp = {handleMouseUp}

>
<Layer>
{lines.map((line,i) =>(
  <Line
  key = {i}
  points = {line.points}
  stroke = " grey"
  strokeWidth = {10}
  tension ={0.5}
  lineCap = "round"
  globalCompositeOperation ={
    line.tool === 'eraser' ? 'destination-out': 'source-over'
  }/> ))}
<Shape
sceneFunc = { ( context, shape) => {
  context.beginPath();
  context.moveTo(20,50);
  context.lineTo(220,80);
  context.quadraticCurveTo( 150,100,260,170);
  context.closePath();
  context.fillStrokeShape(shape);
}}

fill=" grey"
stroke = " black"
strokeWidth = {5}
/>
<Rect width = {50} height={50} fill = "red" draggable = {"true"} />
<Circle 
    x={50}
    y={100}
    width={200}
    height={100}
    fill={"darkred"}
    stroke={"orange"}
    cornerRadius={12}
draggable={"true"}
/>

</Layer>
</Stage>
<select
value = {tool}
onChange = {(e) => {
  setTool(e.target.value);
}}>
<option value = 'pen'>Pen</option>
<option value = 'eraser'> Eraser</option>
</select>

</div>

  );
}
export default App;
