Map {
  background-color: rgba(0, 0, 0, 0);
}

#strassen {
  //line-color: black;
  line-width: 1;
  [zoom>12]{line-width: 1.5;}
  [zoom>14]{
   ::outline {line-width: 6; line-color: #000000;}
   ::inline {line-width: 2; line-color: #facf4c;}
  }
  [zoom>16]{ line-width: 8;}
}

#zaehlgebiete {
  line-width: 1;
  line-color: rgba(4, 19, 4, 0.5);
  polygon-fill: #f8dcf3;
  [BEZ='02'] {polygon-fill: #f482e0;}
}

