#!/usr/bin/env node

import fs from "fs";
import chalk from 'chalk';
import figlet from 'figlet';
import inquirer from 'inquirer';
import { maxProjectileHeight, writeContent, maxDistanceTraveled } from "../modules/calc.js";


// Mostrar un banner con un mensaje formado por caracteres.
const msn = msn => {
    console.log(chalk.bold.cyan(figlet.textSync(msn, { 
      font:  'ANSI Shadow',
      horizontalLayout: 'default',
      verticalLayout: 'default'
    })));
  }

// Preguntas que se van a realizar y que más tarde usaremos
const queryParams = () => {
    const qs = [{
        name: 'unidad',
        type: 'list',
        message: '¿La velocidad inicial es en M/S o KMh?',
        choices: [
            'M/S',

            'KMh'
          ],
      },{
        name: 'vO',
        type: 'input',
        message: 'Ingresa la velocidad inicial'
      },{
        name: 'angulo',
        type: 'input',
        message: 'Ingrese el angulo de lanzamiento en grados'
      }, {
        name: 'type',
        type: 'list',
        message: '¿Quiere guardar los resultados en un archivo?',
        choices: [
          'Si',
          'No'
        ],
      },
      {
        name: 'nombreArchivo',
        type: 'input',
        message: 'Ingrese el nombre del archivo si eligió guardarlo, sino coloque none'
      },
    ];
    return inquirer.prompt(qs);
}

//procesamiento de la información
const processingData = (data) => {

    //llamo a las funciones que calculan la altura máxima y la distancia recorrida
   let h_max = maxProjectileHeight(data.vO,data.angulo,data.unidad);
   let results = maxDistanceTraveled(data.unidad, h_max, data.angulo, data.vO);
  
   //si el usuario ha decidido guardar la información en un archivo se crea
    if(data.type === 'Si'){
        fs.writeFile(`${data.nombreArchivo}.txt`,writeContent(results,data),(err)=>{
            if(err) throw err;
            console.log("El archivo ha sido guardado exitosamente!");
        })
    }
   
        console.log(`------ ${chalk.magenta.bold('TUS DATOS HAN SIDO PROCESADOS DE FORMA EXITOSA')} ------\n
        -------- Estos son tus valores -------
        - Velocidad inicial ingresada (vO) : ${data.vO} ${data.unidad}
        - Angulo ingresado : ${data.angulo}
        - Altura máxima : ${chalk.blue.bold(`${results.h_maxMs} / ${results.h_maxKm}`)}\n
        - Distancia máxima : ${chalk.blue.bold(`${results.x_maxMs} / ${results.x_maxKm}`)}\n
        ----------------------------------\n`);

  }


(async() => {
    msn('CLI-FEMHACK');
    processingData(await queryParams());
  })();