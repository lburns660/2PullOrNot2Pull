
#Written by:  Dr Nyaigoti Agoti
#Code for plotting number of pools positive
#Written by:  Dr Nyaigoti Agoti

# First import all necessary libraries
rm(list=ls())
library(tidyverse)
library(extrafont)
library(reshape2)

#setwd("")
my_dta <-read.csv("positivity_pools.csv", sep=",", header = T, stringsAsFactors =T)
names(my_dta)

pdf("Fig_3b.pdf", width = 3.0, height = 6.0)

my_data <- my_dta%>%
  mutate(positives=factor(positives))

names(my_data) 
ggplot(my_data)+
  geom_bar(aes(x=positives), color= "deepskyblue2", fill= "deepskyblue")+
  theme_light()+
  labs(x="No. of +ves in the pool", y="No. of pools")+
  scale_y_continuous(minor_breaks = seq(0, 200, 10), breaks = seq(0 , 200, 20))+
  theme(axis.title.x = element_text(size = 12),
        axis.title.y = element_text(size = 12),
        axis.text.x = element_text(size = 11),
        axis.text.y = element_text(size = 11),
        legend.position = "side",
        legend.key.size = unit(0.45, "cm"),
        legend.spacing.x = unit(0.5, 'cm'),
        legend.text = element_text(size = 12),
        legend.title =element_blank(),
        legend.box.background = element_blank())
dev.off()

print ("Done")
