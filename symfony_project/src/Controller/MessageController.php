<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Message;
use Symfony\Component\HttpFoundation\Request;
use App\Service\CookieHelper;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\Persistence\ManagerRegistry;



class MessageController extends AbstractController
{

    #[Route('/message', name: 'message')]
    public function index(): Response
    {
        return $this->render('message/index.html.twig', [
            'controller_name' => 'MessageController',
        ]);
    }

    #[Route('/message/{user}', name: 'message_send', methods: 'POST')]
    public function message(
        Request $request,
        User $user,
        HubInterface $hub,
        ManagerRegistry $doctrine
    )
    {
        $data = $request->getContent();
        $data = json_decode($data);

        /* $message = new Message;
        $message->setMessage($data->content);
        $message->setFrom($data->from);
        $message->setChannel($data->channel);
        $message->setCreateAt(new \DateTime());

        $entityManager = $doctrine->getManager();
        $entityManager->persist($message);
        $entityManager->flush(); */
        
        $update = new Update(
            [
                "https://example.com/my-private-topic",
                "https://example.com/user/{$user->getId()}/?topic=" . urlencode("https://example.com/my-private-topic")
            ],
            json_encode([
                'user' => $user->getUsername(),
                'id' => $user->getId(),
                'message' => $data
            ]),
            true
        );

        $hub->publish($update);

        return $this->json($update);

    }
}
