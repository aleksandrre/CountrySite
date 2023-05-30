import { useEffect, useState } from "react";

import "./App.css";
import { Countries } from "./Api";
import {
  Badge,
  Button,
  Card,
  Drawer,
  Image,
  Input,
  List,
  Rate,
  Space,
  Typography,
} from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
const App = () => {
  const [data, setData] = useState(null);
  const [inputWord, setInputWord] = useState("");
  const [buttonWord, setButtonWord] = useState("");
  const [flagGerb, setFlagGerb] = useState(true);
  const [cart, setCart] = useState([]);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  const continents = [
    "",
    "Asia",
    "Africa",
    "North America",
    "South America",
    "Europe",
    "Antarctica",
    "Oceania",
  ];
  useEffect(() => {
    Countries().then((data) => setData(data));

    Countries().then((data) => console.log(data));
  }, []);

  const CookedData = () =>
    data
      ?.filter((item) =>
        item.name.common.toLowerCase().includes(inputWord.toLowerCase())
      )
      ?.filter((item) =>
        item.continents[0].toLowerCase().includes(buttonWord.toLowerCase())
      )
      .map((element, index) => (
        <Card
          className="itemCard"
          title={element.name.common}
          cover={
            <Image
              className="itemCardImage"
              src={flagGerb ? element.flags.png : element.coatOfArms.png}
              alt="This country has no Gerb"
            />
          }
          actions={[<Rate allowHalf value={4} />, <AddToCart item={element} />]}
        >
          <Card.Meta
            title={
              <Typography.Paragraph>
                Capital:{element.capital}{" "}
                <Typography.Text delete type="danger"></Typography.Text>
              </Typography.Paragraph>
            }
            description={
              <Typography.Paragraph
                ellipsis={{ rows: 2, expandable: true, symbol: "more" }}
              >
                Location:<a href={element.maps.googleMaps}>Go to Map</a>
              </Typography.Paragraph>
            }
          ></Card.Meta>
        </Card>
      ));

  const AddToCart = ({ item }) => {
    return (
      <Button onClick={() => setCart([...cart, item])}>ADD To Cart</Button>
    );
  };
  return (
    <>
      {console.log(cart)}
      <Input
        onChange={(e) => setInputWord(e.target.value)}
        type="text"
        placeholder="Search Country ..."
        className="search"
      />

      <Space size={25} style={{ marginBottom: "20px" }}>
        {continents.map((item, index) => (
          <Button
            key={index}
            type="dashed"
            className="ContinentBtns"
            name={item}
            onClick={(e) => setButtonWord(e.currentTarget.name)}
          >
            {item ? item : "All"}
          </Button>
        ))}
      </Space>
      <Button
        style={{ marginLeft: "100px" }}
        type="primary"
        onClick={() => setFlagGerb(!flagGerb)}
      >
        Flag Or Gerb
      </Button>

      <Badge
        onClick={() => {
          setCartDrawerOpen(true);
        }}
        count={cart.length}
        className="soppingCartIcon"
      >
        <ShoppingCartOutlined className="cart" />
      </Badge>

      <List
        grid={{ column: 3 }}
        renderItem={(element, index) => {
          return element;
        }}
        dataSource={CookedData()}
      ></List>
      <Drawer
        open={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        contentWrapperStyle={{ width: 500 }}
        dataSource={cart}
      >
        <Space size={20}>
          <Button
            type="primary"
            onClick={() =>
              setCart([...cart]?.sort((a, b) => a.population - b.population))
            }
          >
            Increase byPopulation
          </Button>
          <Button
            type="primary"
            onClick={() =>
              setCart([...cart]?.sort((a, b) => b.population - a.population))
            }
          >
            Decrease byPopulation
          </Button>
        </Space>

        {cart?.map((item) => (
          <Card
            className="itemCard"
            title={item.name.common}
            cover={
              <Image
                className="itemCardImage"
                src={flagGerb ? item.flags.png : item.coatOfArms.png}
              />
            }
          >
            <Typography.Paragraph className="populationText">
              Population: {item.population}
            </Typography.Paragraph>
          </Card>
        ))}
      </Drawer>
    </>
  );
};

export default App;
