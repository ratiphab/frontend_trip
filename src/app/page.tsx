"use client";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import api from "./../../lib/axios";
import useSWR from "swr";
import Grid from "@mui/material/Grid2";
import Link from "@mui/material/Link";
import { Paper } from "@mui/material";

interface trip {
  title: string;
  eid: string;
  url: string;
  description: string;
  photos: string[];
  tags: string[];
}
interface Respons {
  data: trip[];
  success: boolean;
}

export default function Home() {
  const [search, setSearch] = useState(
    decodeURIComponent(
      window.location.hash.substring(1)
    ) || ""
  );
  const [listData, setListData] = useState<
    trip[]
  >([]);
  console.log("listData", listData);
  const { data, error, isLoading } =
    useSWR<Respons>(
      `/api/trips?keyword=${search}`,
      api
    );
  useEffect(() => {
    setListData(data?.data || []);
  }, [data]);
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          height: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            paddingTop: "24px",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Noto Sans Thai",
              fontWeight: 400,
              fontSize: "36px",
            }}
          >
            ไปเที่ยวไหนดี
          </Typography>
          <TextField
            sx={{
              width: "100%",
              padding: "24px 24px",
              borderColor: "#FFF",
              "& input": {
                textAlign: "center",
                fontFamily: "Noto Sans Thai",
              },
            }}
            hiddenLabel
            id="filled-hidden-label-normal"
            placeholder="ค้นหา"
            variant="standard"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <Box>
            {listData.map((trip) => {
              return (
                <Box
                  sx={{
                    padding: "24px 24px",
                  }}
                  key={trip.eid}
                >
                  <Grid
                    container
                    spacing={2}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Grid
                      size={4}
                      sx={{
                        display: "flex",
                      }}
                    >
                      <img
                        src={trip.photos[0]}
                        width={250}
                        height={300}
                        style={{
                          borderRadius: "20px",
                          objectFit: "cover",
                        }}
                      />
                    </Grid>
                    <Grid
                      size={8}
                      sx={{
                        display: "flex",
                        justifyContent:
                          "space-between",
                        flexDirection: "column",
                      }}
                    >
                      <Link
                        sx={{
                          fontFamily:
                            "Noto Sans Thai",
                          fontWeight: 600,
                          fontSize: 16,
                          color: "#000",
                        }}
                        href={trip.url}
                        underline="hover"
                      >
                        {trip.title}
                      </Link>
                      <Box>
                        <Typography
                          sx={{
                            fontFamily:
                              "Noto Sans Thai",
                            fontWeight: 600,
                            fontSize: 12,
                            color: "#525252",
                          }}
                        >
                          {trip.description + " "}
                          <Link
                            sx={{
                              fontFamily:
                                "Noto Sans Thai",
                              fontWeight: 600,
                              fontSize: 12,
                              cursor: "pointer",
                            }}
                            href={trip.url}
                          >
                            อ่านต่อ
                          </Link>
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "12px",
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily:
                              "Noto Sans Thai",
                            fontWeight: 600,
                            fontSize: 12,
                            color: "#525252",
                          }}
                        >
                          หมวด
                        </Typography>
                        {trip.tags.map(
                          (item, index) => {
                            return (
                              <Box
                                sx={{
                                  textDecoration:
                                    "underline",
                                  cursor:
                                    "pointer",
                                }}
                                key={index}
                                onClick={() => {
                                  window.location.hash =
                                    item;
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontFamily:
                                      "Noto Sans Thai",
                                    fontWeight: 600,
                                    fontSize: 12,
                                    color:
                                      "#525252",
                                  }}
                                >
                                  {item}
                                </Typography>
                              </Box>
                            );
                          }
                        )}
                      </Box>
                      <Box
                        sx={{
                          gap: "20px",
                          display: "flex",
                          flexDirection: "row",
                          width: "100%",
                          justifyContent:
                            "space-evenly",
                          alignItems: "center",
                        }}
                      >
                        {trip.photos
                          .slice(1)
                          .map((item, index) => {
                            return (
                              <img
                                src={item}
                                width={180}
                                height={180}
                                style={{
                                  borderRadius:
                                    "20px",
                                  objectFit:
                                    "cover",
                                }}
                              ></img>
                            );
                          })}
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
