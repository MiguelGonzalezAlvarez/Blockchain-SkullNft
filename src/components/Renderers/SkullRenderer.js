import React from "react";
import { parts } from "../../parts/skullParts";

import _r1 from "../../assets/rarity/1.png";
import _r2 from "../../assets/rarity/2.png";
import _r3 from "../../assets/rarity/3.png";

const SkullRenderer = ({ skull = null, size = 200, style }) => {
    if (!skull) return null;

    const rarity = assignRarity(skull.rarity);
    const dna = assignDna(skull.dna);
    const skullDetail = {
        back: dna.substring(0, 2) % 5,
        face: dna.substring(0, 2) % 5,
        mouth: dna.substring(0, 2) % 5,
        nose: dna.substring(0, 2) % 5,
        eye: dna.substring(0, 2) % 5,
        crown: dna.substring(0, 2) % 5,
        name: skull.name
    }
    const skullStyle = {
        width: "100%",
        height: "100%",
        position: "absolute"
    }

    return (
        <div style={{ minWidth: size, minHeight: size, background: "blue", position: "relative", ...style }}>
            <img alt={"back"} src={parts.backs[skullDetail.back]} style={skullStyle} />
            <img alt={"face"} src={parts.faces[skullDetail.face]} style={skullStyle} />
            <img alt={"mouth"} src={parts.mouths[skullDetail.mouth]} style={skullStyle} />
            <img alt={"nose"} src={parts.noses[skullDetail.nose]} style={skullStyle} />
            <img alt={"eye"} src={parts.eyes[skullDetail.eye]} style={skullStyle} />
            <img alt={"crown"} src={parts.crowns[skullDetail.crown]} style={skullStyle} />
            <img alt={"rarity"} src={rarity} style={skullStyle} />
        </div>
    );
}

function assignRarity(skullRarity) {
    if (skullRarity >= 95) {
        return _r3;
    }

    if (skullRarity >= 80) {
        return _r2;
    }

    return _r1;
}

function assignDna(skullDna) {
    let functionDna = String(skullDna);

    while (functionDna.length < 16) functionDna = "0" + functionDna;

    return functionDna;
}

export default SkullRenderer