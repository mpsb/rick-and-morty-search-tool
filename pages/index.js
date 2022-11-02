import React, { Suspense, useContext, useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import client from "@apollo-client";
import { Flex, LoadingIndicator } from "@components/containers";
import {
  Button,
  Input,
  ScrollToTopButton,
  Select,
} from "@components/interactive";
import { Body, Header, Subheader } from "@components/text";
import ClickableImage from "@components/media/ClickableImage";
import { LanguageContext } from "contexts";
import Head from "next/head";

// lazy loading
const SearchListItem = React.lazy(() =>
  import("@components/containers/SearchListItem")
);

const GET_CHARACTERS_BY_NAME_AND_STATUS = gql`
  query Character($characterName: String!, $status: String!, $page: Int!) {
    characters(page: $page, filter: { name: $characterName, status: $status }) {
      results {
        name
        status
        image
      }
      info {
        count
        pages
        next
      }
    }
  }
`;

export default function Home({ initialData }) {
  const { dictionary, setUserLanguage } = useContext(LanguageContext);

  const [queryResult, setQueryResult] = useState([]);
  const [paginationOptions, setPaginationOptions] = useState({});
  const [nameToSearch, setNameToSearch] = useState("");
  const [statusToSearch, setStatusToSearch] = useState("");
  const [page, setPage] = useState(1);

  const { loading, error, data } = useQuery(GET_CHARACTERS_BY_NAME_AND_STATUS, {
    variables: {
      characterName: nameToSearch,
      status: statusToSearch,
      page: page,
    },
    client: client,
  });

  // options for the status dropdown
  const selectOptions = [
    { value: "", text: dictionary["status"] },
    { value: "Alive", text: dictionary["Alive"] },
    { value: "Dead", text: dictionary["Dead"] },
    { value: "unknown", text: dictionary["unknown"] },
  ];

  // functions that handle various interactions
  function handleNameChange(event) {
    setNameToSearch(event.target.value);
  }

  function handleStatusChange(event) {
    setStatusToSearch(event.target.value);
  }

  function handleButtonClick() {
    if (paginationOptions.next < paginationOptions.pages) {
      setPage(page + 1);
    }
  }

  function handleFlagClick(event) {
    setUserLanguage(event.target.getAttribute("value"));
  }

  // useEffect for getting initial data after refresh
  useEffect(() => {
    setQueryResult(initialData.characters.results);
    setPaginationOptions(initialData.characters.info);
  }, [initialData]);

  // useEffect for updating list
  useEffect(() => {
    if (loading || error) return;
    if (page > 1) {
      setQueryResult((queryResult) =>
        queryResult.concat(data?.characters.results)
      );
      setPaginationOptions(data?.characters.info);
    } else {
      setQueryResult(data?.characters.results);
      setPaginationOptions(data?.characters.info);
    }
  }, [page, data, loading, error]);

  // useEffect for resetting the length of the list back to 20
  useEffect(() => {
    setPage(1);
  }, [statusToSearch, nameToSearch]);

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com/" />
        <title>Rick and Morty Character Search Tool</title>
        <meta
          name="description"
          content="Tool for searching up Rick and Morty characters by name and status."
        />
      </Head>
      {loading ? (
        <LoadingIndicator loadingDescription={dictionary["loading"]} />
      ) : null}
      <ScrollToTopButton>{dictionary["scrollToTop"]}</ScrollToTopButton>
      <Flex
        flexDirection="column"
        alignItems="center"
        padding="64px 0px 24px 0px"
      >
        <Body>{dictionary["language"]}</Body>
        <Flex padding="0" gap={16} flexDirection="row" fixFlexDirection>
          <ClickableImage
            src="/us-flag.svg"
            width={32}
            height={32}
            alt="US Flag. Click to change language to English."
            onClick={handleFlagClick}
            value="en"
          />
          <ClickableImage
            src="/spain-flag.svg"
            width={32}
            height={32}
            alt="Spanish Flag. Click to change language to Spanish."
            onClick={handleFlagClick}
            value="es"
          />
        </Flex>
      </Flex>
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        padding="0px 64px 64px"
      >
        <Header>Rick and Morty</Header>
        <Subheader>{dictionary["characterSearchTool"]}</Subheader>
        <Input
          placeholder={dictionary["searchForCharacters"]}
          handleChange={handleNameChange}
        />
        <Select options={selectOptions} handleChange={handleStatusChange} />
        {queryResult?.length === 0 ? (
          <Body>{dictionary["noResultsFound"]}</Body>
        ) : (
          queryResult?.map((character, index) => {
            return (
              <Suspense
                fallback={<div></div>}
                key={`${character?.id}-${index}`}
              >
                <SearchListItem
                  name={character?.name}
                  status={dictionary[character?.status]}
                  imageUrl={character?.image}
                />
              </Suspense>
            );
          })
        )}
        {paginationOptions?.next >= paginationOptions?.pages ||
        paginationOptions?.next === null ? null : (
          <Button handleButtonClick={handleButtonClick}>
            {dictionary["loadMoreCharacters"]}
          </Button>
        )}
      </Flex>
    </>
  );
}

export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query {
        characters(page: 1) {
          results {
            id
            name
            status
            image
          }
          info {
            count
            pages
            next
          }
        }
      }
    `,
  });

  return {
    props: {
      initialData: data,
    },
  };
}
