
-- Datafiniti_Hotel_Reviews ( Table)
CREATE TABLE "Hotel" (
    "Name" TEXT NOT NULL PRIMARY KEY,
	"Address" TEXT   NOT NULL,
	"City" TEXT   NOT NULL,
	"State" TEXT   NOT NULL,
	"Postal Code" INT   NOT NULL,
	"country" TEXT   NOT NULL,
	"Latitude" INT  NOT NULL,
	"Longitude" INT  NOT NULL
	"Category" TEXT   NOT NULL,
	"Review Rating" INT   NOT NULL,
	"Review Comments" TEXT   NOT NULL,
	"websites" TEXT   NOT NULL,
);
-- Datafiniti_Hotel_Reviews ( Table)
CREATE TABLE "Hotel" (
    "Name" TEXT NOT NULL PRIMARY KEY,
	"Address" TEXT   NOT NULL,
	"City" TEXT   NOT NULL,
	"State" TEXT   NOT NULL,
	"Postal Code" INT   NOT NULL,
	"Country" TEXT   NOT NULL,
	"Latitude" INT  NOT NULL,
	"Longitude" INT  NOT NULL,
	"Category" TEXT   NOT NULL,
	"Review Rating" INT   NOT NULL,
	"Review Comments" TEXT   NOT NULL,
	"websites" TEXT   NOT NULL
);

-- Datafiniti_Hotel_Reviews_Jun19 (Table)
CREATE TABLE "Hotel2" (
    "Name" TEXT NOT NULL PRIMARY KEY,
	"Address" TEXT   NOT NULL,
	"City" TEXT   NOT NULL,
	"State" TEXT   NOT NULL,
	"Postal Code" INT   NOT NULL,
	"Country" TEXT   NOT NULL,
	"Latitude" INT  NOT NULL,
	"Longitude" INT  NOT NULL,
	"Category" TEXT   NOT NULL,
	"Review Rating" INT   NOT NULL,
	"Review Comments" TEXT   NOT NULL,
	"websites" TEXT   NOT NULL
);


-- 7282_1 (Table)
CREATE TABLE "Hotel3" (
    "Name" TEXT NOT NULL PRIMARY KEY,
	"Address" TEXT   NOT NULL,
	"City" TEXT   NOT NULL,
	"Postal Code" INT   NOT NULL,
	"Province" TEXT   NOT NULL,
	"Latitude" INT  NOT NULL,
	"Longitude" INT  NOT NULL,
	"Category" TEXT   NOT NULL,
	"Review Rating" INT   NOT NULL,
	"Review Comments" TEXT   NOT NULL
);