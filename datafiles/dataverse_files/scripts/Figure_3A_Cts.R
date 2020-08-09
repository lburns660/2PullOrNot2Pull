#Code for plotting pairwise distances
#Written by:  Dr Nyaigoti Agoti
#Code for plotting BOxplot of ct_values
#Written by:  Dr Nyaigoti Agoti

# First import all necessary libraries
rm(list=ls())
library(tidyverse)
library(extrafont)
library(reshape2)

#setwd("")
my_dta <-read.csv("Ct_values_pool_vs_individual.csv", sep=",", header = T, stringsAsFactors =T)
names(my_dta)

pdf("Fig_3a.pdf", width = 3.0, height = 6.0, family = "Microsoft Tai Le")

my_data <- my_dta%>%
  #filter(test2_ct < 37.0)%>%
  melt(id.vars=c("number", "poolnumber", "sample_no"))%>%
  rename(Test=variable, Ct_value = value)
  
names(my_data) 
ggplot(my_data, aes(x=Test, y=Ct_value, group=number))+
  geom_line(aes(x=Test, y=Ct_value), linetype="dashed", size=0.25, color= "deepskyblue")+
  geom_point(shape=21, size=3, color= "deepskyblue", aes(x=Test, y=Ct_value))+
  scale_y_continuous(minor_breaks = seq(10, 40, 1), breaks = seq(10 , 40, 2))+
  #geom_dotplot(binaxis = 'y', stackdir = 'center',
  #position = position_dodge(), binwidth=0.6)+
  theme_light()+
  labs(x="Protocol", y="Cycle threshold (Ct) value")+
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

print ("Welcome to IEOS 1:59 on 12-Oct-2019, Tuko Viena!")
# reference 1: http://www.sthda.com/english/wiki/ggplot2-box-plot-quick-start-guide-r-software-and-data-visualization
# reference 1: https://stackoverflow.com/questions/41764818/ggplot2-boxplots-with-points-and-fill-separation
