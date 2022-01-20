function randomCallSign() {
  let text = "OE-";
  const length = 3;
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (let i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function randomLetter() {
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return possible.charAt(Math.floor(Math.random() * possible.length));
}

function randomInt(min, max, prng = Math.random) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(prng() * (max - min + 1)) + min;
}

function strPad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

export const flight1 = function () {

  const fullCallSign = randomCallSign();
  let callSign1 = fullCallSign;
  let callSign2 = fullCallSign;
  let callSign3 = fullCallSign;
  const shortSign = fullCallSign.substr(0, 1) + '-' + fullCallSign.substr(4, 2);
  if (randomInt(0, 1) === 0) {
    callSign1 = shortSign;
  }
  if (randomInt(0, 1) === 0) {
    callSign2 = shortSign;
  }
  if (randomInt(0, 1) === 0) {
    callSign3 = shortSign;
  }
  const startUpTime = strPad(randomInt(1, 59), 2, '0');
  const startUpTemperature = randomInt(-5, 20);
  const departureRunway = strPad(randomInt(1, 36), 2, '0');
  const departureSquak = randomInt(1, 6) + '' + randomInt(1, 7) + randomInt(0, 7) + randomInt(0, 7);
  const wind1dirInt = randomInt(0, 359);
  const wind1 = {direction: strPad(wind1dirInt, 3, '0'), speed: randomInt(2, 20)};
  const wind2 = {direction: strPad(wind1dirInt + randomInt(-15, +15), 3, '0'), speed: wind1.speed + randomInt(-5, +5)};
  const qnh1 = randomInt(970, 1050);
  const clearenceFL = randomInt(10, 20) * 10;

  const airborneTime = strPad(randomInt(1, 59), 2, '0');

  let taxiwaysDeparture = "";
  const countTaxiways = randomInt(2, 4);
  for (let i = 0; i < countTaxiways; i++) {
    let taxiway = randomLetter();
    if (randomInt(0,1) === 1) {
      taxiway += randomInt(1, 9);
    }
    let taxiwaySeperator = '';
    if (i === countTaxiways -1) {
      taxiwaySeperator = ' and ';
    } else if (i > 0) {
      taxiwaySeperator = ', ';
    }
    taxiwaysDeparture += taxiwaySeperator + taxiway;
  }

  // something between is ok: 118.000 - 136.000 MHz
  const radarFrequency1 = '1' + randomInt(18, 35) + '.' + randomInt(10, 200);
  const radarFrequency2 = '1' + randomInt(18, 35) + '.' + randomInt(10, 200);

  return {
    steps: [
      {sender: 'G', text: `${fullCallSign} C182 fliegt IFR von Innsbruck nach Linz, verlässt kurz die Frequenz von Wien Radar um sich den Wetterbericht von Linz zu holen (Deutsch), streicht danach den IFR-Flug und fliegt VFR nach Linz weiter (Deutsch).`},
      {sender: 'A', text: `Innsbruck Tower, ${fullCallSign}`},
      {sender: 'G', text: `${callSign1}, Innsbruck Tower, go ahead`},
      {sender: 'A', text: `${callSign1}, request start up, information [A-Z] received`},
      {sender: 'G', text: `${callSign1}, start up is approved at ${startUpTime}, temperature ${startUpTemperature}`},
      {sender: 'A', text: `Start up is approved at ${startUpTime}, temperature ${startUpTemperature}, ${callSign1}`},
      {sender: 'A', text: `${callSign1}, position [eg. Apron], request taxi`},
      {sender: 'G', text: `${callSign1}, taxi to holdingpoint runway ${departureRunway} via ${taxiwaysDeparture}, wind ${wind1.direction}°/${wind1.speed}kt, QNH ${qnh1}`},
      {sender: 'A', text: `Taxi to holdingpoint runway ${departureRunway} via ${taxiwaysDeparture}, wind ${wind1.direction}°/${wind1.speed}kt, QNH ${qnh1}, ${callSign1}`},
      {sender: 'G', text: `${callSign1}, your clearance`},
      {sender: 'A', text: `Ready to copy, ${callSign1}`},
      {sender: 'G', text: `${fullCallSign} cleared Linz VOR, FL${clearenceFL}, Salzburg 1J departure, after departure squawk ${departureSquak}, clearance expires at 45`},
      {sender: 'A', text: `${fullCallSign} is cleared to Linz VOR, FL${clearenceFL}, Salzburg 1J departure, after departure squawk ${departureSquak}, clearance expires at 45, ${callSign1}`},
      {sender: 'G', text: `${callSign1}, read back correct, report ready for departure`},
      {sender: 'A', text: `Will report ready for departure, ${callSign1}.`},
      {sender: 'A', text: `${callSign1}, ready for departure runway ${departureRunway}`},
      {sender: 'G', text: `${callSign1}, wind ${wind2.direction}°/${wind2.speed}kt, runway ${departureRunway}, cleared for take off`},
      {sender: 'A', text: `Wind ${wind2.direction}°/${wind2.speed}kt, runway ${departureRunway}, cleared for take off, ${callSign1}`},
      {sender: 'G', text: `${callSign1}, airborne ${airborneTime}, when passing 3000ft contact Innsbruck Radar on ${radarFrequency1}`},
      {sender: 'A', text: `Airborne ${airborneTime}, when passing 3000ft contact Innsbruck Radar on ${radarFrequency1}, ${callSign1}`},

      {sender: 'A', text: `Innsbruck Radar, ${fullCallSign} 3000ft climbing (to FL${clearenceFL}), squaking ${departureSquak}`},
      {sender: 'G', text: `${callSign2}, Innsbruck Radar, squawk ident`},
      {sender: 'A', text: `Ident is [on/coming], ${callSign2}`},
      {sender: 'G', text: `${callSign2} identified, report Rattenburg NDB`},
      {sender: 'A', text: `Will report RTT NDB, ${callSign2}`},
      {sender: 'A', text: `${callSign2} passing Rattenburg NDB FL[something below ${clearenceFL}] climbing (to FL${clearenceFL})`},
      {sender: 'G', text: `Innsbruck Radar`},
      {sender: 'A', text: `${callSign2} reaching and maintaining, ${clearenceFL}`},
      {sender: 'G', text: `${callSign2} contact Wien Radar ${radarFrequency2},`},
      {sender: 'A', text: `Will contact Wien Radar on ${radarFrequency2}, ${callSign2}`},

      {sender: 'A', text: `Wien Radar, ${fullCallSign}, ${clearenceFL} maintaining`},
      {sender: 'G', text: `${callSign3}, Wien Radar, climb FL220`},
      {sender: 'A', text: `climbing to FL220, leaving ${clearenceFL} now, ${callSign3}`},
      {sender: 'A', text: `${callSign3}, reaching and maintaining FL220`},
      {sender: 'G', text: `Wien Radar`},
      {sender: 'A', text: `${callSign3}, request leaving your frequency for 5 minutes to contact Wien Information`},
      {sender: 'G', text: `${callSign3} approved, proceed as cleared and report back on my frequency`},
      {sender: 'A', text: `Approved proceed as cleared and will report back on your frequency, ${callSign3}`},

      {sender: 'A', text: `Wien Information, ${fullCallSign}`},
      {sender: 'G', text: `${fullCallSign}, Wien Information`},
      {sender: 'A', text: `${fullCallSign}, C182, IFR von Innsbruck nach Linz 10NM östlich SBG VOR 05 FL220 erbitte Wetterbericht von Linz`},
      {sender: 'G', text: `${fullCallSign}, verstanden, Wetterbericht Linz: Beobachtungszeit 1050 Wind 310°/7kt Sicht 12km leichter Regen mittel bewölkt in 5000ft, stark bewölkt in 7500ft, bedeckt in 13000ft Temperatur 4, Taupunkt 0 QNH 1015 NOSIG`},
      {sender: 'A', text: `Wetterbericht Linz, Beobachtungszeit 1050 Wind 310°/7kt Sicht 12km leichter Regen mittel bewölkt in 5000ft, stark bewölkt in 7500ft, bedeckt in 13000ft Temperatur 4, Taupunkt 0 QNH 1015 NOSIG , verlasse die Frequenz ${fullCallSign}`},
      {sender: 'G', text: `${fullCallSign}, verstanden`},

      {sender: 'A', text: `Wien Radar, ${fullCallSign}, back on your frequency`},
      {sender: 'G', text: `${callSign3}, roger`},
      {sender: 'G', text: `${callSign3}, descent to FL60`},
      {sender: 'A', text: `Leaving FL220 descent to FL60 ${callSign3}`},
      {sender: 'A', text: `${callSign3}, reaching FL60 cancelling my IFR-flight`},
      {sender: 'G', text: `${callSign3}, roger IFR cancelled at 15 sqawk 7000 and leave frequency`},
      {sender: 'A', text: `IFR cancelled at 15 squawk 7000 and leave frequency, ${callSign3}`},

      {sender: 'A', text: `Linz Turm, ${fullCallSign}`},
      {sender: 'G', text: `${fullCallSign}, Linz Turm`},
      {sender: 'A', text: `${fullCallSign}, [pos, höhe] zwecks Landung`},
      {sender: 'G', text: `${fullCallSign}, frei zum Einflug in die Kontrollzone über Sattledt, Sierra, Marchtrenk in 2000ft oder darunter QNH 1015 Piste 27 melden Sie Marchtrenk`},
      {sender: 'A', text: `Frei zum Einflug in die Kontrollzone über Sattledt, Sierra, Marchtrenk in 2000ft oder darunter QNH 1015 Piste 27, melde Marchtrenk, ${fullCallSign}`},
      {sender: 'A', text: `${fullCallSign}, Marchtrenk [höhe]`},
      {sender: 'G', text: `${fullCallSign}, fliegen sie in die Warterunde Süd`},
      {sender: 'A', text: `Fliege in die Warterunde Süd, ${fullCallSign}`},
      {sender: 'G', text: `${fullCallSign}, wind 290°/12kt Piste 27 Landung frei, machen sie eine kurze Landung`},
      {sender: 'A', text: `Wind 290°/12kt Piste 27 Landung frei, mache eine kurze Landung, ${fullCallSign}`},
      {sender: 'G', text: `${fullCallSign}, rollen sie über Rollweg F zur Abstellfläche, Landezeit 32`},
      {sender: 'A', text: `Rolle über Rollweg F zur Abstellfläche, Landezeit 32, ${fullCallSign}`},
      {sender: 'A', text: `${fullCallSign}, erbitte verlassen der Frequenz`},
      {sender: 'G', text: `${fullCallSign}, sie können die Frequenz verlassen`},
      {sender: 'A', text: `Verlasse die Frequenz, ${fullCallSign}`}
    ]
  }
};