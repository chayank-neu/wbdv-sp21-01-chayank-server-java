package com.example.wbdvsp2101chayankserverjava.services;

import com.example.wbdvsp2101chayankserverjava.models.Widget;
import com.example.wbdvsp2101chayankserverjava.repositories.WidgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;


@Service
public class WidgetService {

    private static final AtomicLong TS = new AtomicLong();

    @Autowired
    WidgetRepository repository;

    public static long getUniqueTimestamp() {
        return TS.incrementAndGet();
    }

    public Widget createWidgetForTopic(String topicId, Widget widget) {

//        widget=new Widget();
        widget.setTopicId(topicId);
//       widget.setId(getUniqueTimestamp());
//       widget.setName("hello");
//       widget.setType("PARAGRAPH");
        String t=widget.getType();
        Widget newNode= repository.save(widget);
        return newNode;
//        widget.setTopicId(topicId);
//        widgets.add(widget);
//        return widget;
    }

    public List<Widget> findWidgetsForTopic(String topicId) {

        return repository.findWidgetsForTopic(topicId);

//        List<Widget> ws = new ArrayList<Widget>();
//        for(Widget w: widgets) {
//            if(w.getTopicId().equals(topicId)) {
//                ws.add(w);
//            }
//        }
//        if (ws.isEmpty()){
//            return new ArrayList<Widget>();
//        }
//        return ws;
    }

    public Integer updateWidget(Long id, Widget widget) {

        if(!repository.findById(id).isPresent())
            return -1;

        repository.save(widget);
        return 1;
    }

    public Integer deleteWidget(Long id) {

        repository.deleteById(id);

        if(repository.findById(id).isPresent())
            return 1;
        return -1;
    }

    public List<Widget> findAllWidgets() {
        return (List<Widget>) repository.findAll();
    }

    public Widget findWidgetById(Long id) {
        return repository.findById(id).get();
    }

}
