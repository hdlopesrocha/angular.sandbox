package com.enter4ward.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.File;
import java.util.Map;

@Service
public class MailService {

    @Autowired
    JavaMailSenderImpl mailSender;
    @Autowired
    private TemplateEngine templateEngine;

    public void sendSimpleMessage(String to, String subject, String text){
        MimeMessage message = mailSender.createMimeMessage();
        try {
            new MimeMessageHelper(message) {{
                addTo(to);
                setSubject(subject);
                setText(text);
            }};
            mailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    public void sendHtmlMessage(String to,
                                String subject,
                                String templateName,
                                Map<String,String> params,
                                Map<String, String> files){
        MimeMessage message = mailSender.createMimeMessage();
        try {
            new MimeMessageHelper(message){{
                addTo(to);
                setSubject(subject);
                Context context = new Context();
                if(params != null) {
                    params.entrySet().forEach(it -> context.setVariable(it.getKey(), it.getValue()));
                }
                setText(templateEngine.process(templateName, context), true);
                if(files != null) {
                    for (Map.Entry<String, String> entry : files.entrySet()) {
                        FileSystemResource file = new FileSystemResource(new File(entry.getValue()));
                        addAttachment(entry.getKey(), file);
                    }
                }
            }};

            mailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    public void sendMessageWithAttachment(String to,
                                          String subject,
                                          String text,
                                          Map<String, String> paths) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            // pass 'true' to the constructor to create a multipart message
            new MimeMessageHelper(message, true){{
                setTo(to);
                setSubject(subject);
                setText(text);
                for(Map.Entry<String, String> entry : paths.entrySet()){
                    FileSystemResource file = new FileSystemResource(new File(entry.getValue()));
                    addAttachment(entry.getKey(), file);
                }
            }};
            mailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}
