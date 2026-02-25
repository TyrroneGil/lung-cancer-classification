import { useState, useEffect } from "react";
import Container from "~/component/Container";
import Card from "~/component/Card";
import Button from "~/component/Button";
import Upload from "~/component/Upload";
import { Route } from "react-router";
import { MoveLeft } from "lucide-react";
export default function Home() {
  
  return (
    <Container>
      
      <div className="header">
      <Upload/>
      </div>
      <div className="charts w-full h-auto">
      </div>
    </Container>
  );
}
