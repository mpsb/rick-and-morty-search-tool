import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "@components/text/Header";
import Subheader from "@components/text/Subheader";
import Input from "@components/interactive/Input";
import Flex from "@components/containers/Flex";
import Select from "@components/interactive/Select";

const selectOptions = [
  { value: "Status", text: "Status" },
  { value: "Alive", text: "Alive" },
  { value: "Dead", text: "Dead" },
  { value: "Unknown", text: "Unknown" },
];

export default function Home() {
  return (
    <>
      <Flex>
        <Header>Rick and Morty</Header>
        <Subheader>Character Search Tool</Subheader>
        <Input placeholder="Search for characters..." />
        <Select options={selectOptions} />
      </Flex>
    </>
  );
}
