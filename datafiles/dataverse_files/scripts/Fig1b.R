
#Written by:  Dr Nyaigoti Agoti
#Code for plotting KEMRI-Testing
#Written by:  Dr Nyaigoti Agoti


rm(list=ls())
library(reshape2)
library(tidyverse)
library(scales)
library(extrafont)

#setwd("")
prev_data <- read.csv("Kilifi_summary_15Jul2020.csv", header=T, sep=",")
names(prev_data)

pdf("Figure 1b.pdf", width = 6.0, height = 4.0, family= "Microsoft Tai Le")

my_data <-prev_data%>%
  mutate(date_collect= as.Date(collection_date, format="%d-%b-%Y"))

ggplot(my_data, aes(x=date_collect))+
  geom_col(aes(y=tests), color= "#FFE5CC", fill="#FFE5CC", width = 0.60)+
  geom_line(aes(y=proportion*20), group=1, color="deepskyblue", linetype = "longdash",  size= 0.25)+
  geom_point(aes(y=proportion*20),group=1,shape=4, size= 1, color="deepskyblue")+
  scale_x_date(date_breaks = "14 day", 
               labels=date_format("%d-%b"),
               limits = as.Date(c("01-03","15-07"), format="%d-%b"))+
  scale_y_continuous(minor_breaks = seq(0,1200,100), breaks = seq(0,1200,200), sec.axis = sec_axis( ~.*0.05, name = ("Proportion (%) +ve"), breaks = seq(0,100,10)))+
  geom_vline(xintercept = as.numeric(as.Date("14-05-2020", format="%d-%m-%20Y")), size=8, linetype="dashed",color="black")+
  theme_classic()+
  labs(x="Date", y="Number of samples tested", size = 11)+
  theme(axis.title.x = element_text(size = 11),
        axis.text.x = element_text(size = 10),
        axis.text.y.left =element_text(size = 10),
        axis.title.y.left = element_text(angle = 90, hjust = 0.5, size=11,color="black"),
        axis.title.y.right = element_text(angle = 90, hjust = 0.5, size=11,color="deepskyblue"),
        axis.text.y.right = element_text(angle = 0, hjust = 0.5, size=10, color="deepskyblue"),
        legend.position = c(0.20, 0.92),
        legend.key.size = unit(0.5, "cm"),
        legend.spacing.x = unit(0.5, 'cm'),
        legend.text = element_text(size = 14),
        legend.title =element_blank(),
        legend.box.background = element_blank())

dev.off()
  
  

