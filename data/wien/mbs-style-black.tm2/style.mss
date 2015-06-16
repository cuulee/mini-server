Map {
  background-color: rgba(0,0,0,0);
}

#strassen {
  //line-color: black;
  line-width: 1;
  [EDGECATEGORY='G'][zoom<13]{line-color:rgba(0,0,0,0);}
  [zoom>12]{line-width: 1.5;}
  [zoom>14]{
   ::outline {line-width: 8; line-color: black;}
   ::inline {line-width: 4; line-color: white;}
  }
  [zoom>16]{ line-width: 10;}
}

#zaehlgebiete {
  line-width: 0.5;
  line-dasharray: 3,6;
  line-color: #000;
  polygon-fill: rgba(250,250,250,0.5);
}

