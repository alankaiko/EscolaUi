import { AlunoService } from './../../zservice/aluno.service';
import { Imagem } from 'src/app/core/model';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

import { Component, OnInit, Input } from '@angular/core';
import { WebcamInitError, WebcamUtil, WebcamImage } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-imagem',
  templateUrl: './imagem.component.html',
  styleUrls: ['./imagem.component.css'],
  providers: [ MessageService , ConfirmationService]
})
export class ImagemComponent implements OnInit {
  @Input() imagem: Imagem;
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  index: number;
  atendimentos: any[];
  procedimentosAtd: any[];
  cont: number;
  atendimentoSelecionado: number;
  procedimentosAtdSelecionado: number;
  imagemant: any;
  verifica = false;
  item = 0;

  public errors: WebcamInitError[] = [];

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

  constructor(private rota: ActivatedRoute,
              private confirmation: ConfirmationService,
              private service: AlunoService) { }

  ngOnInit() {
    if (this.imagem !== undefined || this.imagem !== null) {
      this.ConfigurarVariavel();
    }

    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  ConfirmarExclusao() {
    this.confirmation.confirm({
      message: 'Deseja Excluir esta Imagem?',
      accept: () => {
        delete this.imagem;
      }
    });
  }

  PegaAltura() {
    return 550;
  }

  PegaLargura() {
    return 550;
  }

  public TiraFoto(): void {
    this.trigger.next();

    if (this.item === 0) {
      this.item = 1;
    }
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean|string): void {
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.imagem.imagem = webcamImage;
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }

  ConfigurarVariavel() {
    this.service.PegarImagemString(this.imagem.codigo).subscribe(data => {
      const web = new WebcamImage(data, data, null);
      this.imagem.imagem = web;
    }, error => {
      console.log(error);
    });
  }

}
