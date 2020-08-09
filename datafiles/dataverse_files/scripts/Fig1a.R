#Written by:  Dr Nyaigoti Agoti
#Code for pooled teststing paper
#Written by:  Dr Nyaigoti Agoti

# First import all necessary libraries


rm(list=ls())
library(reshape2)
library(tidyverse)
library(scales)
library(extrafont)

#setwd("")
prev_data <- read.csv("country_15Jul2020.csv", header=T, sep=",")
names(prev_data)

pdf("Figure 1a.pdf", width = 6.0, height = 4.0, family= "Microsoft Tai Le")

my_data <-prev_data%>%
  mutate(date_collect= as.Date(collection_date, format="%d-%b-%Y"))

ggplot(my_data, aes(x=date_collect))+
  geom_col(aes(y=tests), color= "#BABABA", fill="#BABABA", width = 0.70)+
  geom_line(aes(y=proportion*100), group=1, color="red", linetype = "longdash",  size= 0.25)+
  geom_point(aes(y=proportion*100),group=1,shape=4, size= 1, color="red")+
  scale_x_date(date_breaks = "14 day", labels=(date_format("%d-%b")))+
  scale_y_continuous(minor_breaks = seq(0,9000,1000), breaks = seq(0,9000,1000), sec.axis = sec_axis( ~.*0.01, name = ("Proportion (%) +ve"), breaks = seq(0,100,10)))+
  theme_classic()+
  labs(x="Date", y="Number of samples tested", size = 11)+
  theme(axis.title.x = element_text(size = 11),
        axis.text.x = element_text(size = 10),
        axis.text.y.left =element_text(size = 11),
        axis.title.y.left = element_text(angle = 90, hjust = 0.5, size=11,color="#000000"),
        axis.title.y.right = element_text(angle = 90, hjust = 0.5, size=11,color="red"),
        axis.text.y.right = element_text(angle = 0, hjust = 0.5, size=11, color="red"),
        legend.position = c(0.20, 0.92),
        legend.key.size = unit(0.5, "cm"),
        legend.spacing.x = unit(0.5, 'cm'),
        legend.text = element_text(size = 12),
        legend.title =element_blank(),
        legend.box.background = element_blank())

dev.off()
  
  

