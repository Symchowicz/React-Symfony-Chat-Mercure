<?php

namespace App\Entity;

use App\Repository\MessageRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MessageRepository::class)]
class Message
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    private $message;

    /* faire une relation avec user */
    #[ORM\Column(type: 'integer')]
    private $from;

    #[ORM\Column(type: 'string', length: 255)]
    private $channel;

    #[ORM\Column(type: 'datetime')]
    private $CreateAt;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMessage(): ?string
    {
        return $this->message;
    }

    public function setMessage(string $message): self
    {
        $this->message = $message;

        return $this;
    }

    public function getFrom(): ?int
    {
        return $this->from;
    }

    public function setFrom(int $from): self
    {
        $this->from = $from;

        return $this;
    }

    public function getChannel(): ?string
    {
        return $this->channel;
    }

    public function setChannel(string $channel): self
    {
        $this->channel = $channel;

        return $this;
    }

    public function getCreateAt(): ?\DateTimeInterface 
    {
        return $this->CreateAt;
    }

    public function setCreateAt(\DateTimeInterface  $CreateAt): self
    {
        $this->CreateAt = $CreateAt;

        return $this;
    }
}
