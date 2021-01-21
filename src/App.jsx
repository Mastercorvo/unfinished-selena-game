
import './App.css';

import { useState, useRef, useEffect, useLayoutEffect, useMemo, useCallback } from 'react';

import ReactPlayer from 'react-player';

import Zone1 from './zona 1/Zone1';

import Sala from './sala/Sala';

import Pueblo from './pueblo/Pueblo'

import System from './system.svg';

import Moment from './moment.svg';

// Selena

const SelenaHabla = 'https://i.ibb.co/4f6dxLH/selena1.png';
const SelenaHablaSeria = 'https://i.ibb.co/dgP6TZY/selena10.png';
const SelenaHablaTriste = 'https://i.ibb.co/6RWdPkq/selena7.png';
const SelenaDesconfia = 'https://i.ibb.co/vYX4mcJ/selena9.png';
const SelenaAvergonzada = 'https://i.ibb.co/jRD33qx/selena2.png';
const SelenaFeliz = 'https://i.ibb.co/zZPGCFG/selena3.png';

// Nicolas

const NicolasEncantado = 'https://i.ibb.co/Wgw9VkY/nicolas-4.png';
const NicolasFeliz = 'https://i.ibb.co/QfGsSJV/nicolas-3.png';
const NicolasHabla = 'https://i.ibb.co/FWYsVqC/nicolas-2.png';
const NicolasHablaFeliz = 'https://i.ibb.co/3CkQXt1/nicolas-1.png';

const Espada = 'https://i.ibb.co/r5cHjnz/espadamaekir.png';

// Random

const Flecha = 'https://i.ibb.co/2ZFSfRC/Chavez-Official-portrait-photo.jpg';

// Objetos

const Nota = 'https://i.ibb.co/pZc8WZJ/nota.png';

//Escenarios

const Trono = 'https://i.ibb.co/80TQYBT/tronofull.png';
const SalaImg = 'https://i.ibb.co/jZSXYtD/sala-de-estar-full.png';
const PuebloImg = 'https://i.ibb.co/GF8nNVk/pueblo-full.png';

//Code

const Images =[[SelenaHabla, 'SelenaHabla'], [SelenaHablaSeria, 'SelenaHablaSeria'],[SelenaHablaTriste,'SelenaHablaTriste'], [SelenaDesconfia, 'SelenaDesconfia'], [SelenaAvergonzada, 'SelenaAvergonzada'],
[System, 'system'],[Trono, 'trono'], [NicolasEncantado, 'NicolasEncantado'], [NicolasFeliz, 'NicolasFeliz'],
[NicolasHabla, 'NicolasHabla'], [NicolasHablaFeliz,'NicolasHablaFeliz'],[SelenaFeliz, 'SelenaFeliz'],
[Flecha, 'flecha'], [Espada, 'espada'], [Nota, 'nota'], [SalaImg, 'sala'], [PuebloImg, 'pueblo'], [Moment, 'moment']];

function App() {

  const ObjetImages = useRef({});

  const [isLoad, setIsLoad] = useState(true);
  const [countImages, setCountImages] = useState(0);
  const [countImagesLoad, setCountImagesLoad] = useState(0);
  const [onPlay, setOnplay] = useState(false);
  const [showPlayScreen, setShowPlayScreen] = useState(true);

  const [zonesArrow, setZonesArrow] = useState([]);
  const [zone, setZone] = useState('trono')

  const [inventoryDescription, setInventoryDescription] = useState('');
  const [showInventoryDescription, setShowInventoryDescription] = useState(false);

  const cacheImages = async (arr) =>{

    setCountImages(()=>arr.length)

    const promises = await arr.map(([link, name])=>{
  
      return new Promise( resolve =>{

        fetch(link, {method:'GET'}).then(result=>{
          
          return result.blob();
        }).then(result=>{
          setCountImagesLoad(v=>v+1);
          resolve([name, URL.createObjectURL(result)]);

        })

      })
  
    });

    
    ObjetImages.current = {...Object.fromEntries(await Promise.all(promises)), ...ObjetImages.current}
    
    setOnplay(()=>true);
    
    setIsLoad(false);

  }
  
  useLayoutEffect(()=>{
    
    cacheImages(Images);

  }, []);

  const [TEXT, setTEXT] = useState('');

  const [avatar, setAvatar] = useState('');
  const [newFoto, setNewFoto] = useState(false);
  const [showText, setShowText] = useState(false);

  const writing = useRef(false);
  const arrayTexts = useRef([]);
  const currentText = useRef('');
  const currentNowWriting = useRef(false);
  const arrayOfTimeOuts = useRef([]);

  const [inventario, setInventario] = useState({});

  const [showInventario, setShowInventario] = useState(false);

  const animationAvatarStart = useRef(false);

  const currentAnyText = useRef(false);

  function inputText(array){

    if(writing.current) return false;
    
    currentAnyText.current = true;

    writing.current = true;

    setShowText(true);

    for(let i = 0; i < array.length; i++){

      arrayTexts.current[i] = ()=>later(array[i]);

    }

    function later(_DATA){

      // Animation code

      let DATA = _DATA?_DATA:{};
      
      let { text, speed, replace, wait, img } = DATA;

      setAvatar(()=>{

        if(!img) return ObjetImages.current['system'];

        return ObjetImages.current[img];
      
      });

      setTimeout(() => {
        
        setNewFoto(()=>true);

      }, 0);
      animationAvatarStart.current = true;

      // Code

      currentNowWriting.current = true;

      for(let i = 0;i < arrayOfTimeOuts.current.length; i++){
        
        clearTimeout(arrayOfTimeOuts.current[i]);
        
      }
      
      if(speed === undefined) speed = 40;
      if(replace === undefined) replace = true;
      if(replace){

        setTEXT(()=>'');

      }
      if(wait === undefined) wait = 0;
      
      currentText.current = text.join``;

      let textModify = '';

      let textOriginal = ''

      if(replace){

        textModify = text[0] + ' _';
  
        textOriginal = text[0];

      }else{

        textModify = TEXT + text[0] + ' _';
  
        textOriginal = TEXT + text[0];

      }

      for(let i = 0; i <= wait/100 ;i++){

        setTimeout(()=>{

          if((i%2) === 0){

            setTEXT(()=>textModify);

          }else{

            setTEXT(()=>textOriginal);

          }

          if(i === (wait/100)) continueText();

        }, 100 * i);

      }

      function continueText(){

        setTEXT(()=>textOriginal);

        for(let i = 0; i < text[1].length;i++){
    
          arrayOfTimeOuts.current.push(setTimeout(()=>{
    
            setTEXT(v=>v+text[1][i]);
    
            if(i === (text[1].length - 1)){

              currentNowWriting.current = false;

              if(!animationAvatarStart.current) setNewFoto(()=>false);

            }
    
          }, speed * i))
    
        }
  
      }
      
    }
    
    arrayTexts.current.shift()();

  }

  function first(){

    addItem('flecha', 'Un comandante que estará siempre en nuestro corazones.', 'Un Chavez');
    addItem('espada', '¡La legendaria espada de tungsteno! Este objeto no puede ser utilizado aquí.', 'Maekir');

    inputText([{text:['— Nicolás:',' Es un gusto tenerte por aquí Selena, me alegra mucho que vengas a visitar el castillo. '], img: 'NicolasHabla'},
    {text:['— Selena:',' Gracias a ti por dejarme venir.'], img: 'SelenaFeliz'},
    {text:['— Nicolás:',' ¿Que deseas hacer por aquí? '], img: 'NicolasEncantado'},
    {text:['— Selena:',' Vengo a pasear y conocer un poco ¿No hay problema con que camine por el castillo un poco? '], img: 'SelenaFeliz'},
    {text:['— Nicolás:',' ¡No hay ningún problema en lo absoluto! Confío en tí pero solo no vayas a donde los guardias estén en la puerta.'], img: 'NicolasEncantado'},
    {text:['— Nicolás:',' Si necesitas algo házmelo saber, estaré atendiendo unos asuntos.'], img: 'NicolasHabla'},
    {text:['','— Nicolás se retira de la sala.'], img: 'moment'},
    {text:['— Selena:',' Bien... Ya es hora de buscar pruebas contra Nicole. '], img: 'SelenaHablaSeria'},])

  }

  const count = useRef(0);

  function textHandler(){

    if(currentNowWriting.current){

      setNewFoto(()=>false);

      for(let i = 0;i < arrayOfTimeOuts.current.length; i++){
        
        clearTimeout(arrayOfTimeOuts.current[i]);
        
      }

      setTEXT(()=>currentText.current);

      currentNowWriting.current = false

      return false;

    }

    if(arrayTexts.current.length === 0) count.current = 1
    
    const Element = arrayTexts.current.shift();
    
    setNewFoto(()=>false);

    Element && Element();

    if(count.current === 1) {

      setShowText(false);

      currentAnyText.current = false

      writing.current = false;

      currentText.current = '';

      count.current = 0;
    
    }

  }

  const [textPlay, setTextPlay] = useState('READY?');
  const [FINAL, setFINAL] = useState(false);

  function addItem(image, description, name, position){

    function onClick(){

      setInventoryDescription(description);

      setShowInventoryDescription(()=>true);

    }

    setInventario((inv)=>{

      const copy = {...inv}

      copy[image] = (<div className="item" onClick={onClick}>

        <div className="image" style={{backgroundImage:`url(${ObjetImages.current[image]})`}}></div>

        <p className="name">{name}</p>

      </div>);
  
      return copy;
      
  })

  }

  function buttonPlayHandler(){

    setShowPlayScreen(false);
          
    first();

  }

  function inventoryDescriptionHandler(){

    setShowInventoryDescription(()=>false)

  }

  function closeInventoryHandler(){

    setShowInventario(false);
    setShowInventoryDescription(()=>false);

  }

  function showInventoryHandler(){

    if(currentAnyText.current) return false;

    setShowInventario(true);

  }

  function leftHandler() {

    if(currentAnyText.current) return false;

    setZone(()=>zonesArrow[0]);
    
  }

  function rightHandler() {

    if(currentAnyText.current) return false;

    setZone(()=>zonesArrow[1]);

  }
  
  //Song

  const [castilloSong, setCastilloSong] = useState(false);

  const castilloSongElement = useRef(undefined);

  useEffect(()=>{

    if((zone === 'sala' || zone === 'trono') && !showPlayScreen) setCastilloSong(true);
      else setCastilloSong(false);

  });

  const afueraSongElement = useRef(undefined);

  const [afueraSong, setAfueraSong] = useState(false);

  useEffect(()=>{
  
    if(zone === 'pueblo') setAfueraSong(true);
      else setAfueraSong(false);

  })

  if(isLoad){

    return <div className="load">

      <h1>Unfinished Selena Game (Protoptipe)</h1>

      <span>Un juego original del estudio:</span>
      <div className="container-logos">
        <div className="logo"></div>
        <div className="logo2"></div>
      </div>

      <p>Cargando...</p>

      <div className="bar"><div style={{width:`${(100*countImagesLoad)/countImages}%`}}></div></div>
      
    </div>

  }

  return (

      <div className="App">

        <ReactPlayer url='https://soundcloud.com/breitkopf-haertel/1-movement-from-brandenburg-concerto-no-3-in-g-major-bwv-1048-by-johann-sebastian-bach' playing={castilloSong} width="0" height="0" onEnded={()=>{
          castilloSongElement.current.seekTo(0, 0);

            setCastilloSong(false)
            setTimeout(()=>setCastilloSong(true), 0)
          
          }} ref={castilloSongElement}/>
        
        <ReactPlayer url='https://soundcloud.com/video-background-music/cold-isolation-sad-dramatic-background-music-piano-and-violin' playing={afueraSong} width="0" height="0" onEnded={()=>{
          castilloSongElement.current.seekTo(0, 0);

            setAfueraSong(false)
            setTimeout(()=>setAfueraSong(true), 0)
          
          }} ref={afueraSongElement}/>

        <div className="left arrow" hidden={!zonesArrow[0]} onClick={leftHandler}></div>
        <div className="right arrow" hidden={!zonesArrow[1]} onClick={rightHandler}></div>

        <div className="play"style={{display:showPlayScreen?'flex':'none'}} onClick={buttonPlayHandler}><p hidden={!onPlay} onMouseOut={()=>setTextPlay('READY?')} onMouseOver={()=>setTextPlay('GO!')} >{textPlay}</p>
  
        </div>
        <div className="inventario-icon" onClick={showInventoryHandler}></div>
        <div className="inventario" style={{display:showInventario?'flex':'none'}}>

          <div className="description" style={{display:showInventoryDescription?'grid':'none'}} onClick={inventoryDescriptionHandler}>
            <div className="title"><h3>Descripción:</h3></div>
            <p className="first">{inventoryDescription || 'Example'}</p> 
            <p className="close">Click para cerrar la descripción.</p>
            </div>

          <p className="close" onClick={closeInventoryHandler}>Cerrar</p>

          <div className="container">

            {Object.entries(inventario).map(e=>e[1])}

          </div>

        </div>
        <Zone1 setZonesArrow={setZonesArrow} zone={zone} ObjetImages={ObjetImages} setFINAL={setFINAL} addItem={addItem} inputText={inputText} inventario={inventario} currentAnyText={currentAnyText}/>
        <Sala setZonesArrow={setZonesArrow} ObjetImages={ObjetImages} zone={zone}/>
        <Pueblo setZonesArrow={setZonesArrow} ObjetImages={ObjetImages} zone={zone}/>
        <div className="texto " onClick={textHandler} style={{display:showText?'grid':'none'}}>
        <div className='foto' onAnimationEnd={()=>{
          
          setNewFoto(()=>false);

          animationAvatarStart.current = false;
          
          }} style={{backgroundImage: `url(${avatar})`} }></div>
        

          <div className="text-container"><p>{TEXT}</p></div>

        </div>

      </div>

  );
}

export default App;